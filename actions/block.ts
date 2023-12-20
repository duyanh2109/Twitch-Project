"use server"
import { blockUser, unblockUser } from "@/lib/block-service";
import { revalidatePath } from "next/cache";

export const onBlock = async (id: string) => {
  const blockedUser = await blockUser(id);
  if (blockedUser) {
    revalidatePath(`/${blockedUser.blockedBy.username}`);
  }
  return blockedUser;
};

export const onUnBlock = async (id: string) => {
  const unblockedUser = await unblockUser(id);
  if (unblockedUser) {
    revalidatePath(`/${unblockedUser.blockedBy.username}`);
  }
  return unblockedUser;
};
