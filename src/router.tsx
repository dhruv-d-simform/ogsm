import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from 'react-router';
import { Layout } from '@/components/Layout';
import { HomePage } from '@/pages/HomePage';
import { OgsmDetailPage } from '@/pages/OgsmDetailPage';

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="ogsm/:id" element={<OgsmDetailPage />} />
        </Route>
    )
);
