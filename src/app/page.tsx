import { Hero } from "@/components/layout/Hero";
import { FeaturedPosts } from "@/components/blog/FeaturedPosts";
import { SocialProof } from "@/components/home/SocialProof";
import { StrategicTools } from "@/components/home/StrategicTools";

export default function Home() {
  return (
    <>
      <Hero />
      <SocialProof />
      <FeaturedPosts />
      <StrategicTools />
    </>
  );
}
