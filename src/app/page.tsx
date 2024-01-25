import LeftSidebar from "../components/home/LeftSidebar";
import RightSidebar from "../components/home/RightSidebar";
import PostForm from "@/components/post/PostForm";
import PostCard from "@/components/post/PostCard";
import Model from "@/model/Model";

export default async function Home() {
  const users = await Model.prepare("SELECT * FROM Users WHERE id=?", [1]);
  console.log(users);

  return (
    <div className='container'>
      <div className='flex justify-between'>
        <LeftSidebar />
        <div className=' lg2:max-w-[600px] w-full'>
          <PostForm className='mt-1' />
          {[...Array(10)].map((item: any, index: number) => {
            return <PostCard key={index.toString()} param={index.toString()} />;
          })}
        </div>
        <RightSidebar />
      </div>
    </div>
  );
}
