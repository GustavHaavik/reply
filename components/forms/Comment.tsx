"use client";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "../ui/form";
import { usePathname } from "next/navigation";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { CommentValidation } from "@/lib/validations/post";
import { z } from "zod";
import Image from "next/image";
import { addCommentToPost } from "@/lib/actions/post.actions";

interface Props {
    postId: string;
    currentUserImg: string;
    currentUserId: string;
}

const Comment = ({ postId, currentUserImg, currentUserId }: Props) => {
    const pathname = usePathname();

    const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
        await addCommentToPost(
            postId,
            values.message,
            JSON.parse(currentUserId),
            pathname
        );

        form.reset();
    }

    const form = useForm({
        resolver: zodResolver(CommentValidation),
        defaultValues: {
            message: ""
        }
    });

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="comment-form"
            >
                <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                        <FormItem className="flex items-center gap-3 w-full">
                            <FormLabel>
                                <Image
                                    src={currentUserImg}
                                    alt="profile photo"
                                    width={48}
                                    height={48}
                                    className="rounded-full object-cover"
                                />
                            </FormLabel>
                            <FormControl className="border-none bg-transparent">
                                <Input
                                    type="text"
                                    placeholder="Comment..."
                                    className="no-focus text-light-1 outline-none"
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <Button type="submit" className="comment-form_btn">
                    Reply
                </Button>
            </form>
        </Form>
    )
}

export default Comment