"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MoreHorizontal } from "lucide-react";
import { Transactions } from "@/types";

type SingleTransactionProps = {
  transaction: Transactions;
};
function SingleTransaction({ transaction }: SingleTransactionProps) {
  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <MoreHorizontal />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Detailed View about this Transaction</DialogTitle>
            <DialogDescription>
              <div className="flex flex-col gap-8">
                {" "}
                <div>
                  <p className="font-bold">Date:</p>
                  {transaction.date}
                </div>
                <div>
                  <p className="font-bold">Amount:</p>
                  {transaction.amount.toString()}
                </div>
                <div>
                  <p className="font-bold">Type:</p>
                  {transaction.type}
                </div>
                <div>
                  {" "}
                  <p className="font-bold">Category:</p>
                  {transaction.category}
                </div>
                <div>
                  {" "}
                  <p className="font-bold">Detail:</p>
                  {transaction.detail}
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default SingleTransaction;
