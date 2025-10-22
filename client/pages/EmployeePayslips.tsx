import { useNavigate, useParams } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DollarSign,
  Download,
  Eye,
  Calendar,
  CheckCircle,
  Clock,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const payslips = [
  {
    id: 1,
    month: "April 2024",
    paymentDate: "2024-04-30",
    baseSalary: 75000,
    allowances: 10000,
    deductions: 8500,
    netSalary: 76500,
    status: "Paid",
  },
  {
    id: 2,
    month: "March 2024",
    paymentDate: "2024-03-31",
    baseSalary: 75000,
    allowances: 10000,
    deductions: 8500,
    netSalary: 76500,
    status: "Paid",
  },
  {
    id: 3,
    month: "February 2024",
    paymentDate: "2024-02-29",
    baseSalary: 75000,
    allowances: 10000,
    deductions: 8500,
    netSalary: 76500,
    status: "Paid",
  },
  {
    id: 4,
    month: "January 2024",
    paymentDate: "2024-01-31",
    baseSalary: 75000,
    allowances: 10000,
    deductions: 8500,
    netSalary: 76500,
    status: "Paid",
  },
  {
    id: 5,
    month: "December 2023",
    paymentDate: "2023-12-31",
    baseSalary: 75000,
    allowances: 10000,
    deductions: 8500,
    netSalary: 76500,
    status: "Paid",
  },
  {
    id: 6,
    month: "November 2023",
    paymentDate: "2023-11-30",
    baseSalary: 75000,
    allowances: 10000,
    deductions: 8500,
    netSalary: 76500,
    status: "Paid",
  },
];

interface SelectedPayslip {
  id: number;
  month: string;
  paymentDate: string;
  baseSalary: number;
  allowances: number;
  deductions: number;
  netSalary: number;
  status: string;
}

export default function EmployeePayslips() {
  const { role } = useParams();
  const navigate = useNavigate();
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedPayslip, setSelectedPayslip] = useState<SelectedPayslip | null>(
    null
  );

  const totalEarnings = payslips.reduce(
    (sum, payslip) => sum + payslip.baseSalary + payslip.allowances,
    0
  );
  const totalDeductions = payslips.reduce(
    (sum, payslip) => sum + payslip.deductions,
    0
  );
  const totalNetSalary = payslips.reduce(
    (sum, payslip) => sum + payslip.netSalary,
    0
  );

  const handleViewPayslip = (payslip: SelectedPayslip) => {
    setSelectedPayslip(payslip);
    setViewDialogOpen(true);
  };

  const handleDownloadPayslip = (payslipId: number) => {
    const payslip = payslips.find((p) => p.id === payslipId);
    if (payslip) {
      console.log(`Downloading payslip for ${payslip.month}`);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Paid":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "Pending":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20";
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 p-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            My Payslips
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            View and download your salary slips
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Total Earnings (Last 6 months)
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                    ₹{totalEarnings.toLocaleString()}
                  </p>
                </div>
                <DollarSign className="h-12 w-12 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Total Deductions (Last 6 months)
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                    ₹{totalDeductions.toLocaleString()}
                  </p>
                </div>
                <DollarSign className="h-12 w-12 text-red-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Total Net Salary (Last 6 months)
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                    ₹{totalNetSalary.toLocaleString()}
                  </p>
                </div>
                <DollarSign className="h-12 w-12 text-blue-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Payslips Table */}
        <Card>
          <CardHeader>
            <CardTitle>Payslips</CardTitle>
            <CardDescription>
              {payslips.length} payslips available
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Month & Year</TableHead>
                    <TableHead>Payment Date</TableHead>
                    <TableHead className="text-right">Net Salary</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payslips.map((payslip) => (
                    <TableRow key={payslip.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          <span className="font-medium text-gray-900 dark:text-white">
                            {payslip.month}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-700 dark:text-gray-200">
                        {new Date(payslip.paymentDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <span className="font-semibold text-gray-900 dark:text-white">
                          ₹{payslip.netSalary.toLocaleString()}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={getStatusColor(payslip.status)}
                        >
                          <span className="flex items-center gap-1">
                            {payslip.status === "Paid" && (
                              <CheckCircle className="h-3 w-3" />
                            )}
                            {payslip.status === "Pending" && (
                              <Clock className="h-3 w-3" />
                            )}
                            {payslip.status}
                          </span>
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewPayslip(payslip)}
                            title="View Payslip"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDownloadPayslip(payslip.id)}
                            title="Download PDF"
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Payslip View Dialog */}
        {selectedPayslip && (
          <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Payslip - {selectedPayslip.month}</DialogTitle>
                <DialogDescription>
                  Payment Date: {new Date(selectedPayslip.paymentDate).toLocaleDateString()}
                </DialogDescription>
              </DialogHeader>

              {/* Payslip Content */}
              <div className="space-y-6">
                {/* Company Info */}
                <div className="border-b pb-4">
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                    ACME Corporation
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    HR & Payroll Management System
                  </p>
                </div>

                {/* Employee Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                      Employee Name
                    </p>
                    <p className="text-gray-900 dark:text-white">John Doe</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                      Employee ID
                    </p>
                    <p className="text-gray-900 dark:text-white">EMP001</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                      Designation
                    </p>
                    <p className="text-gray-900 dark:text-white">
                      Senior Software Engineer
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                      Department
                    </p>
                    <p className="text-gray-900 dark:text-white">Engineering</p>
                  </div>
                </div>

                {/* Earnings and Deductions */}
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Earnings
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">
                          Base Salary
                        </span>
                        <span className="text-gray-900 dark:text-white">
                          ₹{selectedPayslip.baseSalary.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">
                          Allowances
                        </span>
                        <span className="text-gray-900 dark:text-white">
                          ₹{selectedPayslip.allowances.toLocaleString()}
                        </span>
                      </div>
                      <div className="border-t pt-2 flex justify-between font-semibold">
                        <span className="text-gray-900 dark:text-white">
                          Gross Salary
                        </span>
                        <span className="text-gray-900 dark:text-white">
                          ₹
                          {(
                            selectedPayslip.baseSalary +
                            selectedPayslip.allowances
                          ).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Deductions
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">
                          Taxes & Deductions
                        </span>
                        <span className="text-gray-900 dark:text-white">
                          ₹{selectedPayslip.deductions.toLocaleString()}
                        </span>
                      </div>
                      <div className="border-t pt-2 flex justify-between font-bold text-lg">
                        <span className="text-gray-900 dark:text-white">
                          Net Salary
                        </span>
                        <span className="text-green-600">
                          ₹{selectedPayslip.netSalary.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="border-t pt-4 text-sm text-gray-600 dark:text-gray-400">
                  <p>
                    This is a system-generated payslip. No signature is required.
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <Button
                  variant="outline"
                  onClick={() => setViewDialogOpen(false)}
                >
                  Close
                </Button>
                <Button
                  onClick={() => {
                    handleDownloadPayslip(selectedPayslip.id);
                    setViewDialogOpen(false);
                  }}
                  className="flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Download PDF
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </DashboardLayout>
  );
}
