
"use client";

import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cn } from "@/lib/utils";

const CustomRadio = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    // The RadioGroupPrimitive.Item is the input itself.
    // The checkmark is a sibling for the CSS to work.
    <>
        <RadioGroupPrimitive.Item ref={ref} {...props} />
        <div className="checkmark"></div>
    </>
  );
});
CustomRadio.displayName = "CustomRadio";

export { CustomRadio };
