import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { useCreateOGSM } from '@/hooks/useOgsm';
import type { CreateOGSMInput } from '@/types';

/**
 * Zod schema for OGSM creation form
 */
const createOgsmSchema = z.object({
    name: z
        .string()
        .min(1, 'OGSM name is required')
        .min(3, 'OGSM name must be at least 3 characters')
        .max(100, 'OGSM name must be less than 100 characters'),
    objective: z
        .string()
        .min(1, 'Objective is required')
        .min(10, 'Objective must be at least 10 characters')
        .max(500, 'Objective must be less than 500 characters'),
});

type CreateOgsmFormData = z.infer<typeof createOgsmSchema>;

interface CreateOgsmDialogProps {
    children: React.ReactNode;
}

/**
 * Dialog component for creating a new OGSM
 */
export function CreateOgsmDialog({ children }: CreateOgsmDialogProps) {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const createOgsmMutation = useCreateOGSM();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<CreateOgsmFormData>({
        resolver: zodResolver(createOgsmSchema),
        defaultValues: {
            name: '',
            objective: '',
        },
    });

    /**
     * Handle form submission
     */
    const onSubmit = (data: CreateOgsmFormData) => {
        const input: CreateOGSMInput = {
            name: data.name,
            objective: data.objective,
            goalIds: [],
            strategyIds: [],
        };

        createOgsmMutation.mutate(input, {
            onSuccess: (newOgsm) => {
                // Close dialog
                setOpen(false);
                // Reset form
                reset();
                // Navigate to the newly created OGSM
                navigate(`/ogsm/${newOgsm.id}`);
            },
            onError: (error) => {
                console.error('Failed to create OGSM:', error);
            },
        });
    };

    /**
     * Handle dialog close - reset form if closing
     */
    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen);
        if (!newOpen) {
            reset();
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Create New OGSM</DialogTitle>
                    <DialogDescription>
                        Create a new OGSM plan. Fill in the basic information to
                        get started.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-4 py-4">
                        {/* OGSM Name Field */}
                        <div className="space-y-2">
                            <Label htmlFor="name">
                                OGSM Name{' '}
                                <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                id="name"
                                placeholder="e.g., Q1 2025 Company Strategy"
                                {...register('name')}
                                disabled={createOgsmMutation.isPending}
                                aria-invalid={errors.name ? 'true' : 'false'}
                                aria-describedby={
                                    errors.name ? 'name-error' : undefined
                                }
                            />
                            {errors.name && (
                                <p
                                    id="name-error"
                                    className="text-sm text-destructive"
                                    role="alert"
                                >
                                    {errors.name.message}
                                </p>
                            )}
                        </div>

                        {/* Objective Field */}
                        <div className="space-y-2">
                            <Label htmlFor="objective">
                                Objective{' '}
                                <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                id="objective"
                                placeholder="e.g., Increase market share by 25% while maintaining profitability"
                                {...register('objective')}
                                disabled={createOgsmMutation.isPending}
                                aria-invalid={
                                    errors.objective ? 'true' : 'false'
                                }
                                aria-describedby={
                                    errors.objective
                                        ? 'objective-error'
                                        : undefined
                                }
                            />
                            {errors.objective && (
                                <p
                                    id="objective-error"
                                    className="text-sm text-destructive"
                                    role="alert"
                                >
                                    {errors.objective.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpen(false)}
                            disabled={createOgsmMutation.isPending}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={createOgsmMutation.isPending}
                        >
                            {createOgsmMutation.isPending && (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            Create OGSM
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
