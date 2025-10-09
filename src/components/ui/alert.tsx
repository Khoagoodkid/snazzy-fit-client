
"use client";

import { useSelector, useDispatch } from "react-redux";
import { closeAlert, confirmAction } from "@/lib/features/alert/alertSlice";
import { CheckCircle, XCircle, AlertCircle, Info } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "./button";
import { AlertState } from "@/lib/features/alert/alertSlice";

type Alert = {
  open: boolean;
  type: "success" | "error" | "warning" | "info";
  title: string;
  message: string;
};

export default function Alert() {
  const { open, type, title, message } = useSelector(
    (state: { alert: AlertState }) => state.alert
  );
  const dispatch = useDispatch();

  const icons = {
    success: <CheckCircle className="w-10 h-10" color="green" />,
    error: <XCircle className="w-10 h-10" color="red" />,
    warning: <AlertCircle className="w-10 h-10" color="red" />,
    info: <Info className="w-10 h-10" color="blue" />,
  };
  const btnColors = {
    success: "var(--success)",
    error: "var(--error)",
    warning: "var(--warning)",
    info: "var(--info)",
  };

  return (
    <Dialog open={open} onOpenChange={() => dispatch(closeAlert())}>
      <DialogContent className="bg-white text-black p-7 max-w-[544px] border border-gray-300  ">
        <DialogHeader>
          <div className="flex flex-row gap-4">
            <div>{icons[type]}</div>
            <div className="flex flex-col">
              <DialogTitle className="font-bold text-lg">{title}</DialogTitle>
              <DialogDescription className="text-gray-500">
                {message}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <DialogFooter className="flex flex-row justify-end gap-3">
          <Button
            className="py-5 px-5 text-black hover:bg-gray-100 bg-transparent rounded-md font-bold text-md"
            onClick={() => dispatch(closeAlert())}
          >
            Cancel
          </Button>
          <Button
            className="py-5 px-5  text-black rounded-md font-bold text-md hover:opacity-[0.9]"
            style={{ background: btnColors[type] }}
            onClick={() => dispatch(confirmAction())}
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
