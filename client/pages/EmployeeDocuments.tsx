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
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  FileText,
  Download,
  Eye,
  Upload,
  Trash2,
  Calendar,
  Badge as BadgeIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const documents = [
  {
    id: 1,
    name: "Offer Letter",
    type: "PDF",
    uploadDate: "2020-01-10",
    size: "2.4 MB",
    category: "Offer",
  },
  {
    id: 2,
    name: "ID Card",
    type: "PDF",
    uploadDate: "2020-01-15",
    size: "1.2 MB",
    category: "ID",
  },
  {
    id: 3,
    name: "January 2024 Salary Slip",
    type: "PDF",
    uploadDate: "2024-02-01",
    size: "0.8 MB",
    category: "Salary Slip",
  },
  {
    id: 4,
    name: "February 2024 Salary Slip",
    type: "PDF",
    uploadDate: "2024-03-01",
    size: "0.8 MB",
    category: "Salary Slip",
  },
  {
    id: 5,
    name: "March 2024 Salary Slip",
    type: "PDF",
    uploadDate: "2024-04-01",
    size: "0.8 MB",
    category: "Salary Slip",
  },
  {
    id: 6,
    name: "Income Tax Return 2023",
    type: "PDF",
    uploadDate: "2024-03-15",
    size: "1.5 MB",
    category: "Tax Form",
  },
  {
    id: 7,
    name: "2023 Performance Report",
    type: "PDF",
    uploadDate: "2024-01-20",
    size: "2.1 MB",
    category: "Performance",
  },
];

const documentCategories = [
  "All",
  "Offer",
  "ID",
  "Salary Slip",
  "Tax Form",
  "Performance",
];

export default function EmployeeDocuments() {
  const { role } = useParams();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const filteredDocuments =
    selectedCategory === "All"
      ? documents
      : documents.filter((doc) => doc.category === selectedCategory);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const handleUploadDocument = () => {
    if (uploadedFile) {
      setUploadDialogOpen(false);
      setUploadedFile(null);
    }
  };

  const handleDownload = (docName: string) => {
    console.log(`Downloading ${docName}`);
  };

  const handleDelete = (docId: number) => {
    console.log(`Deleting document ${docId}`);
  };

  const getCategoryBadgeColor = (category: string) => {
    switch (category) {
      case "Offer":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "ID":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "Salary Slip":
        return "bg-purple-500/10 text-purple-500 border-purple-500/20";
      case "Tax Form":
        return "bg-orange-500/10 text-orange-500 border-orange-500/20";
      case "Performance":
        return "bg-pink-500/10 text-pink-500 border-pink-500/20";
      default:
        return "bg-primary/10 text-primary border-primary/20";
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 p-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              My Documents
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              View and manage your HR documents
            </p>
          </div>
          <Button
            onClick={() => setUploadDialogOpen(true)}
            className="flex items-center gap-2"
          >
            <Upload className="h-4 w-4" />
            Upload New Document
          </Button>
        </div>

        {/* Category Filter */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-2">
              {documentCategories.map((category) => (
                <Button
                  key={category}
                  variant={
                    selectedCategory === category ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Documents Table */}
        <Card>
          <CardHeader>
            <CardTitle>
              {selectedCategory === "All"
                ? "All Documents"
                : selectedCategory}
            </CardTitle>
            <CardDescription>
              {filteredDocuments.length} document(s) available
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Document Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Upload Date</TableHead>
                    <TableHead>File Size</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDocuments.length > 0 ? (
                    filteredDocuments.map((doc) => (
                      <TableRow key={doc.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-gray-500" />
                            <span className="font-medium text-gray-900 dark:text-white">
                              {doc.name}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={getCategoryBadgeColor(doc.category)}
                          >
                            {doc.category}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-gray-700 dark:text-gray-200">
                          {new Date(doc.uploadDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-gray-700 dark:text-gray-200">
                          {doc.size}
                        </TableCell>
                        <TableCell>
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {}}
                              title="View Document"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDownload(doc.name)}
                              title="Download Document"
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(doc.id)}
                              className="text-red-500 hover:text-red-600"
                              title="Delete Document"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8">
                        <p className="text-gray-600 dark:text-gray-400">
                          No documents found in this category
                        </p>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Upload Dialog */}
        <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload New Document</DialogTitle>
              <DialogDescription>
                Upload your HR documents in PDF or DOCX format
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Document Type
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white">
                  <option>Select a document type...</option>
                  <option>Offer Letter</option>
                  <option>ID Card</option>
                  <option>Salary Slip</option>
                  <option>Tax Form</option>
                  <option>Performance Report</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Select File
                </label>
                <Input
                  type="file"
                  accept=".pdf,.docx,.doc"
                  onChange={handleFileUpload}
                  className="cursor-pointer"
                />
                {uploadedFile && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    Selected: {uploadedFile.name}
                  </p>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setUploadDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleUploadDocument} disabled={!uploadedFile}>
                Upload
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
