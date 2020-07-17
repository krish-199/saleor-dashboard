import Decorator from "@saleor/storybook/Decorator";
import {
  ExportErrorCode,
  ExportProductsInput
} from "@saleor/types/globalTypes";
import { storiesOf } from "@storybook/react";
import React from "react";

import { attributes } from "../../../attributes/fixtures";
import ProductExportDialog, {
  ProductExportDialogProps
} from "./ProductExportDialog";

const props: ProductExportDialogProps = {
  attributes: attributes.map(attr => ({
    __typename: "Attribute",
    id: attr.id,
    name: attr.name
  })),
  confirmButtonState: "default",
  errors: [],
  hasMore: true,
  loading: true,
  onClose: () => undefined,
  onFetch: () => undefined,
  onFetchMore: () => undefined,
  onSubmit: () => undefined,
  open: true,
  selectedProducts: 18
};

storiesOf("Views / Products / Export / Export settings", module)
  .addDecorator(Decorator)
  .add("interactive", () => <ProductExportDialog {...props} />)
  .add("no products selected", () => (
    <ProductExportDialog {...props} selectedProducts={0} />
  ))
  .add("errors", () => (
    <ProductExportDialog
      {...props}
      errors={(["fileType", "scope", null] as Array<
        keyof ExportProductsInput | null
      >).map(field => ({
        __typename: "ExportError",
        code: ExportErrorCode.INVALID,
        field
      }))}
    />
  ));