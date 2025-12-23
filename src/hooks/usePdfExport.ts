import { pdf } from '@react-pdf/renderer';
import { useQuery } from '@tanstack/react-query';
import { getOgsmPdfData } from '@/api/pdf';
import type { OGSM } from '@/types';
import { tryCatch } from '@/utils/tryCatch';

/**
 * Hook to export OGSM data as PDF
 * Fetches all related data in a single query and generates a downloadable PDF document
 */
export function usePdfExport(ogsm: OGSM | undefined) {
    /**
     * Fetch all OGSM data for PDF in a single query
     */
    const pdfDataQuery = useQuery({
        queryKey: ['ogsm-pdf-data', ogsm?.id],
        queryFn: async () => {
            if (!ogsm) return null;
            return await getOgsmPdfData(ogsm);
        },
        enabled: !!ogsm,
    });

    /**
     * Check if data is loading
     */
    const isLoading = pdfDataQuery.isLoading || pdfDataQuery.isFetching;

    const isError = pdfDataQuery.isError;

    /**
     * Generate and download PDF
     */
    const exportPdf = async (pdfComponent: React.ReactElement) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const [blob, error] = await tryCatch(pdf(pdfComponent as any).toBlob());

        if (error || !blob) {
            console.error('Failed to generate PDF:', error);
            return;
        }

        // Create download link
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${ogsm?.name || 'OGSM'}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    return {
        goals: pdfDataQuery.data?.goals || [],
        strategies: pdfDataQuery.data?.strategies || [],
        kpis: pdfDataQuery.data?.kpis || [],
        actions: pdfDataQuery.data?.actions || [],
        tasks: pdfDataQuery.data?.tasks || [],
        isLoading,
        isError,
        exportPdf,
    };
}
