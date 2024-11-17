import { wixClientServer } from "@/lib/wixClientServer";
import { protectRoute } from "@/utils/protectRoute";
import Link from "next/link";
import { notFound } from "next/navigation";

const OrderPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const wixClient = await wixClientServer();
  await protectRoute();

  let order;
  try {
    order = await wixClient.orders.getOrder(id);
  } catch (err) {
    return notFound(); // Si l'ordre n'existe pas ou problème, retourne une page 404
  }

  return (
    <div className="flex flex-col h-[calc(100vh-180px)] items-center justify-center">
      <div className="px-40 py-20 border border-gray-200 rounded-xl">
        <h1 className="text-xl font-semibold">Détails de la commande</h1>
        <div className="mt-12 flex flex-col gap-6">
          <div className="">
            <span className="font-medium">Numéro de commande: </span>
            <span>{order.number}</span>
          </div>
          <div className="">
            <span className="font-medium">Nom du destinataire: </span>
            <span>
              {order.billingInfo?.contactDetails?.firstName + " "}
              {order.billingInfo?.contactDetails?.lastName}
            </span>
          </div>
          <div className="">
            <span className="font-medium">Email: </span>
            <span>{order.buyerInfo?.email}</span>
          </div>
          <div className="">
            <span className="font-medium">Prix: </span>
            <span>{order.priceSummary?.subtotal?.amount} €</span>
          </div>
          <div className="">
            <span className="font-medium">Statut du paiement: </span>
            <span>{order.paymentStatus}</span>
          </div>
          <div className="">
            <span className="font-medium">Statut de la commande: </span>
            <span>{order.status}</span>
          </div>
          <div className="">
            <span className="font-medium">Adresse de livraison: </span>
            <span>
              {order.billingInfo?.address?.addressLine1 + " "}
              {order.billingInfo?.address?.city}
            </span>
          </div>
        </div>
      </div>
      <Link href="/" className="underline underline-offset-8 mt-6">
        Vous rencontrez un problème ? Contactez-nous
      </Link>
    </div>
  );
};

export default OrderPage;
