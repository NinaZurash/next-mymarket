import { Camera } from "lucide-react";

import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { CategoriesCombobox } from "./CategoriesCombobox";

type Props = {
  category: string;
  setCategory: (category: string) => void;
};
export default function ProductDetails({ category, setCategory }: Props) {
  return (
    <div className="mt-6 flex w-[600px] flex-col gap-4 rounded-3xl bg-white p-8">
      <span className="font-semibold">განცხადების დეტალები</span>
      <div className="flex flex-col gap-3">
        <span className="text-[13px] font-semibold">განცხადების ტიპი</span>
        <div className="flex">
          <RadioGroup className="flex " defaultValue="option-one">
            <div className="flex items-center space-x-2">
              <RadioGroupItem className="hidden" value="option-one" id="option-one" />
              <Label
                className="rounded-3xl bg-[#496cf9] px-4 py-3 text-white hover:cursor-pointer"
                htmlFor="option-one"
              >
                გაყიდვა
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem className="hidden" value="option-two" id="option-two" />
              <Label
                className="rounded-3xl bg-[#f2f5f7] px-4 py-3 checked:bg-[#496cf9] hover:cursor-pointer"
                htmlFor="option-two"
              >
                შეძენა
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem className="hidden" value="option-two" id="option-two" />
              <Label
                className="rounded-3xl bg-[#f2f5f7] px-4 py-3 checked:bg-[#496cf9] hover:cursor-pointer"
                htmlFor="option-two"
              >
                გაქირავება
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem className="hidden" value="option-two" id="option-two" />
              <Label
                className="rounded-3xl bg-[#f2f5f7] px-4 py-3 checked:bg-[#496cf9] hover:cursor-pointer"
                htmlFor="option-two"
              >
                მომსახურება
              </Label>
            </div>
          </RadioGroup>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="text-[13px] font-semibold">
          აირჩიე/ჩაწერე კატეგორია <span className="text-orange-600">*</span>
        </div>
        <CategoriesCombobox category={category} setCategory={setCategory} />
      </div>
      <div className="m-10 flex h-[200px] items-center justify-center rounded-3xl border-[2px] border-dashed border-[#fec900] ">
        <Input
          type="file"
          accept="image/*,.jpeg,.png,.jpg,.heic,.jpg,.heif,.webp"
          className=" absolute h-[150px] w-[400px] cursor-pointer opacity-0"
          tabIndex={-1}
        />
        <div className="flex flex-col items-center">
          <Camera />
          <div>სურათის ატვირთვა</div>
        </div>
      </div>
    </div>
  );
}
