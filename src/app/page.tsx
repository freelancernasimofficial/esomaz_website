import IconBriefcase from "@/components/icons/IconBriefcase";
import IconChat from "@/components/icons/IconChat";
import IconHomeOutline from "@/components/icons/IconHomeOutline";
import IconImagesOutline from "@/components/icons/IconImagesOutline";
import IconUsers from "@/components/icons/IconUsers";
import IconVideo from "@/components/icons/IconVideo";
import Image from "next/image";
import Link from "next/link";
import LeftSidebar from "../components/home/LeftSidebar";
import RightSidebar from "../components/home/RightSidebar";
import PostForm from "@/components/post/PostForm";
import PostCard from "@/components/post/PostCard";

export default function Home() {
  return (
    <div className='container'>
      <div className='flex justify-between'>
        <LeftSidebar />
        <div className='md:max-w-[300px] md2:max-w-[350px] lg:max-w-[450px] lg2:max-w-[600px] w-full'>
          <PostForm className='mt-0.5' />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
        </div>
        <RightSidebar />
      </div>
    </div>
  );
}
