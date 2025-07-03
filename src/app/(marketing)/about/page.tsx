import { Metadata } from 'next';
import AnimatedComponentsAboutPage from '@/components/about/animatedComponents';

export const metadata: Metadata = {
  title: "Conócenos",
  description: "Descubre la esencia de Craftz, tu tienda de moda personalizada"
}

export default function AboutPage(){
    return (
        <AnimatedComponentsAboutPage />
    );
};