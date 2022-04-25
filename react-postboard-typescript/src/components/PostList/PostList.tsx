import SinglePost from '../SinglePost/SinglePost';
import { useAppSelector } from '../../app/hooks';

import {
    selectPosts,
} from '../PostBoardPage/postBoardPageSlice';


const PostList = () => {
    const posts = useAppSelector(selectPosts);
    return (
        <div>
            {posts.map((post, index) => <SinglePost key={index} post={post}/>)}
        </div>
    )
}

export default PostList;