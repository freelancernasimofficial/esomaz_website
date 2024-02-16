import Model from "@/model/Model";
import LeftSidebar from "../components/home/LeftSidebar";
import RightSidebar from "../components/home/RightSidebar";
import PostCard from "../components/post/PostCard";
import PostForm from "../components/post/PostForm";

export default async function Home() {
  const posts = await Model.query(
    "SELECT *,(SELECT JSON_OBJECT('id',U.id,'uuId',U.uuId,'firstName',U.firstName,'lastName',U.lastName,'username',U.username) FROM Users AS U WHERE U.id=P.userId) AS User,(SELECT JSON_ARRAYAGG(JSON_OBJECT('id',PH.id,'height',PH.height,'width',PH.width,'filename',PH.filename)) FROM Photos AS PH WHERE P.id=PH.postId) AS Photos,(SELECT COUNT(*) FROM Reactions R WHERE R.postId=P.id) AS Reactions,(SELECT COUNT(*) FROM Comments C WHERE C.postId=P.id) AS TotalComments,(SELECT COUNT(*) FROM Posts S WHERE S.sharedId=P.id) AS TotalShares FROM Posts AS P ORDER BY P.id ASC LIMIT 100",
  );

  return (
    <div className='container'>
      <div className='flex justify-between'>
        <LeftSidebar />
        <div className='lg2:max-w-[600px] w-full'>
          <PostForm className='mt-1' />
          {posts.map((item: any, index: number) => {
            return <PostCard key={item.uuId} item={item} />;
          })}
        </div>
        <RightSidebar />
      </div>
    </div>
  );
}
