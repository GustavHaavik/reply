import PostsTab from "@/components/shared/PostsTab";
import ProfileHeader from "@/components/shared/ProfileHeader";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { profileTabs } from "@/constants";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";

async function Page({ params }: { params: { id: string } }) {
    if (!params.id) return null;

    const user = await currentUser();
    if (!user) return null;

    // fetch organization list created by user
    const userInfo = await fetchUser(params.id);
    if (!userInfo?.onboarded) redirect("/onboarding");

    console.log(`1. account id: ${userInfo._id} current user id: ${user.id}`);

    return (
        <section>
            <ProfileHeader
                accountId={userInfo.id}
                authUserId={user.id}
                name={userInfo.name}
                username={userInfo.username}
                imgUrl={userInfo.image}
                bio={userInfo.bio}
            />

            <div className="mt-9">
                <Tabs defaultValue="posts" className="w-full">
                    <TabsList className="tab">
                        {profileTabs.map((tab) =>
                            <TabsTrigger
                                key={tab.label}
                                value={tab.value}
                                className="tab">
                                <Image
                                    src={tab.icon}
                                    alt={tab.label}
                                    width={24}
                                    height={24}
                                    className="object-contain" />
                                <p className="max-sm:hidden">{tab.label}</p>
                                {tab.label === "Posts" && userInfo?.posts.length > 0 && (
                                    <p className="ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2">
                                        {userInfo?.posts.length}
                                    </p>)
                                }
                            </TabsTrigger>
                        )}
                    </TabsList>

                    {profileTabs.map((tab) => (
                        <TabsContent key={`content-${tab.label}`} value={tab.value}>
                            <PostsTab
                                currentUserId={user.id}
                                accountId={userInfo._id}
                                accountType="User"
                            />
                        </TabsContent>
                    ))}
                </Tabs>
            </div>
        </section>
    )
}

export default Page;