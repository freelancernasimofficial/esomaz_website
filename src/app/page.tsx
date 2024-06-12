import LeftSidebar from "../components/home/LeftSidebar";
import RightSidebar from "../components/home/RightSidebar";
import PostForm from "../components/post/PostForm";
import HomePagePosts from "@/components/home/HomePagePosts";

export default async function Home() {
  return (
    <div className='px-4'>
      <div className='flex justify-between'>
        <LeftSidebar />
        <div className='lg2:max-w-[600px] w-full overflow-hidden'>
          <PostForm className='mt-6' />
          <HomePagePosts />
        </div>
        <RightSidebar />
      </div>
    </div>
  );
}
