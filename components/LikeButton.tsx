"use client";

import Image from 'next/image'
import React from 'react'
import { likePost } from '@/lib/actions/post.actions';

type Props = {
    liked: boolean,
    postId: string
    userId: string
}

export default function LikeButton({
    liked,
    postId,
    userId
}: Props) {
    const [isLiked, setIsLiked] = React.useState(liked);
    
    const onPress = async () => {
        const likeState = await likePost(JSON.parse(postId), userId);
        setIsLiked(likeState);
    }

    return (
        <div onClick={onPress}>
            <Image src={`${isLiked ? "/assets/heart-filled.svg" : "/assets/heart-gray.svg"}`}
                alt="heart" width={24} height={24}
                className="cursor-pointer object-contain" />
        </div>
    )
}