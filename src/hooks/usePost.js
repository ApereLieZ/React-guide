import {useMemo} from "react"
export const useSortedPosts = (posts , sort) => {
    const sortedPosts = useMemo(() => {
		console.log("Sort");
		if (sort)
			return [...posts].sort((a, b) => a[sort].localeCompare(b[sort]));
		return posts;
	}, [sort, posts]);

    return sortedPosts;
}

export const usePosts = (post, sort, query) => {
    const sortedPosts = useSortedPosts(post, sort);
    const sortedAndSearchedPosts = useMemo(() => {
		console.log("filter");
		return sortedPosts.filter(post => post.title.toLowerCase().includes(query.toLowerCase()));
	}, [query, sortedPosts]);
    
    return sortedAndSearchedPosts;
}