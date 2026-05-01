import {Dialog} from "@base-ui/react";
import {Button} from "../button";
import type {FC} from "react";
import type {CloseButtonProps} from "./modal.types.ts";

export const CloseButton: FC<CloseButtonProps> = () => (
    <Dialog.Close
        render={
            <Button>
                Отмена
            </Button>
        }
    />
);