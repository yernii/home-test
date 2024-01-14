export type Transactions = {
  id: Number;
  date: string;
  amount: Number;
  type: "cash" | "electronic";
  category: "withdraw" | "deposit";
  detail: string;
};
