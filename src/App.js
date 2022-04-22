import React, { useEffect, useState } from "react";
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";
import './style/App.css';
import PostForm from "./components/PostForm";
import PostFilter from "./components/PostFilter";
import PostService from "./API/PostService";
import MyModal from "./components/UI/modal/MyModal";
import { usePosts } from "./hooks/usePost";
import Loader from "./components/UI/loader/Loader";
import { useFetching } from "./hooks/useFetching";
import { getPageCount, getPagesArray } from "./utils/pages";
import Pagination from "./components/UI/pagination/Pagination";

function App() {
	const [posts, setPosts] = useState([])
	const [filter, setFilter] = useState({ sort: '', query: '' });
	const [modal, setModal] = useState(false);
	const [totalPages, setTotalPages] = useState(0);
	const [limit, setLimit] = useState(10);
	const [page, setPage] = useState(1);
	const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);



	const [fetchPosts, isPostingLoad, postError] = useFetching(async () => {
		const response = await PostService.getAll(limit, page);
		setPosts(response.data);
		const totalCount = response.headers['x-total-count'];
		setTotalPages(getPageCount(totalCount, limit));

	})

	console.log(totalPages);

	const createPost = (newPost) => {
		setPosts([...posts, newPost]);

		setModal(false);
	}

	const changePage = (page) => {
		setPage(page);
	}

	useEffect(() => {
		fetchPosts();
	}, [page])

	const removePost = (post) => {
		setPosts(posts.filter(e => e.id !== post.id));
	}

	return (
		<div className="App">

			<MyButton onClick={() => setModal(true)}>
				Создать пользователя
			</MyButton>
			<MyModal visible={modal} setVisible={setModal}>
				<PostForm create={createPost} />
			</MyModal>

			<hr style={{ margin: '15px' }} />

			<PostFilter
				filter={filter}
				setFilter={setFilter}
			/>
			{postError &&
				<h1>Произошла ошибка, ${postError}</h1>
			}
			{isPostingLoad
				? <div style={{ display: "flex", justifyContent: "center" }}><Loader /></div>
				: <PostList posts={sortedAndSearchedPosts} title="Посты о js" remove={removePost} />
			}

			<Pagination totalPages={totalPages} page={page} changePage={changePage} />



		</div>
	);
}

export default App;
