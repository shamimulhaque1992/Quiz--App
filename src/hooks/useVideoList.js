import { get, getDatabase, limitToFirst, orderByKey, query, ref, startAt } from "firebase/database";
import { useEffect, useState } from "react";
export default function useVideoList(page) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [videos, setVideos] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    useEffect(() => {
        //database operation
        async function fatchVideos() {
            const db = getDatabase();
            const videosRef = ref(db, "videos");
            const videoQuery = query(
                videosRef,
                orderByKey(), startAt("" + page), limitToFirst(8)
            );

            try {
                setError(false);
                setLoading(true);
                //Request firebase database operations
                const snapshot = await get(videoQuery);
                setLoading(false);
                if (snapshot.exists()) {
                    setVideos((prevVideos) => {
                        return [...prevVideos, ...Object.values(snapshot.val())];
                    });
                } else {
                    setHasMore(false);
                }
            } catch (err) {
                console.log(err)
                setLoading(false);
                setError(true);
            }
        }


        setTimeout(() => {
            fatchVideos();
        }, 2000);

    }, [page]);

    return {
        loading,
        error,
        videos,
        hasMore,
    };
}