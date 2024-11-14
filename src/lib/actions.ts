"use server";

import { wixClientServer } from "./wixClientServer";

export const updateUser = async (formData: FormData) => {
  const wixClient = await wixClientServer();

  const id = formData.get("id") as string;
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const phone = formData.get("phone") as string;
  const addressLine = formData.get("addressLine") as string;
  const addressLine2 = formData.get("addressLine2") as string;
  const postalCode = formData.get("postalCode") as string;
  const city = formData.get("city") as string;
  const country = formData.get("country") as string;

  try {
    const res = await wixClient.members.updateMember(id, {
      contact: {
        firstName: firstName || undefined,
        lastName: lastName || undefined,
        phones: phone ? [phone] : undefined,
        addresses: [
          {
            addressLine: addressLine || undefined,
            addressLine2: addressLine2 || undefined,
            postalCode: postalCode || undefined,
            city: city || undefined,
            country: country || undefined,
          },
        ],
      },
    });

    console.log(res);
  } catch (err) {
    console.log(err);
  }
};
