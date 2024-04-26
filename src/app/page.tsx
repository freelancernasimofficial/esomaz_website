import Model from "@/model/Model";
import LeftSidebar from "../components/home/LeftSidebar";
import RightSidebar from "../components/home/RightSidebar";
PostCard;
import PostForm from "../components/post/PostForm";
import getUserByObjectQuery from "@/library/getUserByObjectQuery";
import auth from "@/library/auth";
import PostCard from "@/components/post/PostCard";
import SharedPostCard from "@/components/post/SharedPostCard";
import getHomePagePostsAction from "@/actions/getHomePagePostsAction";

export default async function Home() {
  const posts = await getHomePagePostsAction();

  return (
    <div className='container'>
      <div className='flex justify-between'>
        <LeftSidebar />
        <div className='lg2:max-w-[600px] w-full overflow-hidden'>
          <PostForm className='mt-1' />
          {posts.map((item: any, index: number) => {
            return item?.SharedPost ? (
              <SharedPostCard key={item.uuId} item={item} />
            ) : (
              <PostCard key={item.uuId} item={item} />
            );
          })}
        </div>
        <RightSidebar />
      </div>
    </div>
  );
}
