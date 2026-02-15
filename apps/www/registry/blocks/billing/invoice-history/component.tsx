"use client";

import { Download, FileText, Search } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

interface Invoice {
  id: string;
  date: string;
  amount: string;
  status: "paid" | "pending" | "failed";
  description: string;
}

const defaultInvoices: Invoice[] = [
  { id: "INV-001", date: "Dec 1, 2024", amount: "$20.00", status: "paid", description: "Pro Plan - Monthly" },
  { id: "INV-002", date: "Nov 1, 2024", amount: "$20.00", status: "paid", description: "Pro Plan - Monthly" },
  { id: "INV-003", date: "Oct 1, 2024", amount: "$20.00", status: "paid", description: "Pro Plan - Monthly" },
  { id: "INV-004", date: "Sep 1, 2024", amount: "$15.00", status: "paid", description: "Starter Plan - Monthly" },
  { id: "INV-005", date: "Aug 1, 2024", amount: "$15.00", status: "failed", description: "Starter Plan - Monthly" },
];

export default function InvoiceHistory({
  className,
  invoices = defaultInvoices,
}: {
  className?: string;
  invoices?: Invoice[];
}) {
  const [search, setSearch] = useState("");

  const filtered = invoices.filter(
    (inv) =>
      inv.id.toLowerCase().includes(search.toLowerCase()) ||
      inv.description.toLowerCase().includes(search.toLowerCase())
  );

  const statusColors = {
    paid: "bg-green-100 text-green-700",
    pending: "bg-yellow-100 text-yellow-700",
    failed: "bg-red-100 text-red-700",
  };

  return (
    <Card className={cn("mx-auto w-full max-w-4xl", className)}>
      <CardHeader>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Invoice History
            </CardTitle>
            <CardDescription>
              View and download your past invoices
            </CardDescription>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <Input
              placeholder="Search invoices..."
              className="pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell className="font-medium">{invoice.id}</TableCell>
                <TableCell>{invoice.date}</TableCell>
                <TableCell>{invoice.description}</TableCell>
                <TableCell className="font-medium">{invoice.amount}</TableCell>
                <TableCell>
                  <Badge className={cn("capitalize", statusColors[invoice.status])}>
                    {invoice.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" className="gap-1">
                    <Download className="h-3 w-3" />
                    PDF
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-muted-foreground py-8 text-center">
                  No invoices found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
