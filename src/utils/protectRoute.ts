import { redirect } from "next/navigation";
import { members } from "@wix/members";
import { wixClientServer } from "@/lib/wixClientServer";

export async function protectRoute() {
  const wixClient = await wixClientServer();

  try {
    // Vérifier l'utilisateur authentifié
    const user = await wixClient.members.getCurrentMember({
      fieldsets: [members.Set.FULL],
    });

    if (!user || !user.member || !user.member.contactId) {
      return redirect("/login");
    }

    return user;
  } catch (error) {
    console.error("Error while verifying user authentication:", error);
    return redirect("/login");
  }
}
