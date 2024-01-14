import { NextRequest, NextResponse } from "next/server";

function getRandomDate() {
  const startDate = new Date(2023, 12, 1);
  const endDate = new Date();
  const randomDate = new Date(
    startDate.getTime() +
      Math.random() * (endDate.getTime() - startDate.getTime())
  );
  return randomDate.toLocaleString();
}

function getRandomAmount() {
  return Math.floor(Math.random() * (3000 - 10 + 1)) + 10;
}

function getRandomType() {
  return Math.random() < 0.5 ? "cash" : "electronic";
}

function getRandomCategory() {
  return Math.random() < 0.5 ? "withdraw" : "deposit";
}

export async function GET(request: NextRequest) {
  try {
    const transactions = Array.from({ length: 50 }, (_, index) => ({
      id: 234234 + index,
      date: getRandomDate(),
      amount: getRandomAmount(),
      type: getRandomType(),
      category: getRandomCategory(),
      detail: "Short note ...",
    }));

    let balance = 0;

    transactions.forEach((transaction) => {
      if (transaction.category === "deposit") {
        balance += transaction.amount;
      } else {
        balance -= transaction.amount;
      }
    });

    return NextResponse.json({ transactions, balance });
  } catch (error) {
    return new Response("Error", { status: 400 });
  }
}
