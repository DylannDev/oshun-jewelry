import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CiDeliveryTruck, CiUndo } from "react-icons/ci";

type AccordionDescriptionProps = {
  sanitizedDescription: string;
};

const AccordionDescription = ({
  sanitizedDescription,
}: AccordionDescriptionProps) => {
  return (
    <div className="text-sm font-light ">
      <Accordion className="border-t border-gray-200" type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Détails</AccordionTrigger>
          <AccordionContent>
            <div
              className="description"
              dangerouslySetInnerHTML={{
                __html: sanitizedDescription,
              }}
            ></div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Livraison & Retours</AccordionTrigger>
          <AccordionContent>
            <ul className="flex flex-col gap-2">
              <li className="flex items-center gap-1">
                <CiDeliveryTruck className="text-xl" />
                <span>Livraison standard offerte dès 60€ d’achat*</span>
              </li>
              <li className="flex items-center gap-1">
                <CiUndo className="text-xl" />
                <span>Retours sur 30 jours gratuits</span>
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default AccordionDescription;
