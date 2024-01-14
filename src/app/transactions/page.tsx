// TODO: Seperate server and client render components
"use client";
import * as React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { addDays, format, isWithinInterval } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { columns } from "@/lib/fixed-variables";
import { Transactions } from "@/types/index";
import { Button } from "@/components/ui/button";
import { TransactionSummary } from "@/components/chart";
import SingleTransaction from "@/components/singleTransaction";

export default function Transactions() {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2023, 12, 0),
    to: addDays(new Date(2024, 1, 20), 20),
  });
  const [transactionType, setTransactionType] = React.useState<
    string | undefined
  >(undefined);
  const [transactionCategory, setTransactionCategory] = React.useState<
    string | undefined
  >(undefined);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [data, setData] = React.useState<Transactions[]>([]);
  const [totalBalance, setTotalBalance] = React.useState<Number>();
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/transactions");
        console.log(response);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        setData(result.transactions);
        setTotalBalance(result.balance);
      } catch (err) {
        console.log("Error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const filteredData = data.filter((transaction) => {
    const typeFilter = !transactionType || transaction.type === transactionType;

    const categoryFilter =
      !transactionCategory || transaction.category === transactionCategory;

    const dateFilter =
      !date ||
      (transaction.date &&
        isWithinInterval(new Date(transaction.date), {
          start: date.from!,
          end: date.to!,
        }));

    return typeFilter && categoryFilter && dateFilter;
  });
  function handleResetFunc() {
    setTransactionType("");
    setTransactionCategory("");
    setDate(undefined);
  }
  console.log(data);
  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="container mx-auto py-10">
      <TransactionSummary transactions={filteredData} />
      <div className="font-bold pt-8 text-2xl">
        <h1>Your balance: ${totalBalance?.toString()}</h1>
      </div>
      <div className="flex items-center py-4">
        <Select value={transactionType} onValueChange={setTransactionType}>
          <SelectTrigger className="w-[240px]">
            <SelectValue placeholder="Transaction type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Transaction type</SelectLabel>
              <SelectItem value="cash">Cash</SelectItem>
              <SelectItem value="electronic">Electronic</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <div className="ml-4">
          <Select
            value={transactionCategory}
            onValueChange={setTransactionCategory}
          >
            <SelectTrigger className="w-[240px]">
              <SelectValue placeholder="Transaction category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Transaction category</SelectLabel>
                <SelectItem
                  value="deposit"
                  onSelect={() => setTransactionCategory("deposit")}
                >
                  Deposit
                </SelectItem>
                <SelectItem
                  value="withdraw"
                  onSelect={() => setTransactionCategory("withdraw")}
                >
                  Withdraw
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="ml-4">
          <div className={cn("grid gap-2")}>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant={"outline"}
                  className={cn(
                    "w-[300px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date?.from ? (
                    date.to ? (
                      <>
                        {format(date.from, "LLL dd, y")} -{" "}
                        {format(date.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(date.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={setDate}
                  numberOfMonths={3}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className="ml-4">
          <Button onClick={handleResetFunc}>Reset</Button>
        </div>
      </div>
      <Table>
        <TableCaption>A list of your recent transactions.</TableCaption>
        <TableHeader>
          <TableRow>
            {columns.map((column, index) => (
              <TableHead key={index}>{column.name}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.map((d, index) => (
            <TableRow key={index}>
              <TableCell>{d.date}</TableCell>
              <TableCell>{d.amount.toString()} </TableCell>
              <TableCell>{d.type}</TableCell>
              <TableCell>{d.category}</TableCell>
              <TableCell>{d.detail}</TableCell>
              <div className="p-4">
                <SingleTransaction transaction={d} />
              </div>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
