import * as React from "react";
import { Link } from "react-router-dom";
import {
  getAdminCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  CategoryResponse,
  CategoryRequest,
} from "@/services/categoryService";
import {
  ArrowLeftIcon,
  DownloadIcon,
  PlusCircleIcon,
  SearchIcon,
  TrendingUpIcon,
  LayersIcon,
  PencilIcon,
  Trash2Icon,
  XIcon,
  CheckCircle2Icon,
  AlertCircleIcon,
  Loader2Icon,
  SparklesIcon,
} from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = React.useState<CategoryResponse[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [search, setSearch] = React.useState("");

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingCategory, setEditingCategory] = React.useState<CategoryResponse | null>(null);
  const [formData, setFormData] = React.useState<CategoryRequest>({ name: "", description: "" });
  const [submitting, setSubmitting] = React.useState(false);

  const [deletingId, setDeletingId] = React.useState<number | null>(null);
  const [deleting, setDeleting] = React.useState(false);

  const fetchCategories = React.useCallback(() => {
    setLoading(true);
    getAdminCategories()
      .then((data) => setCategories(data))
      .catch((err) => {
        console.error(err);
        toast.error("Không thể tải danh sách danh mục!", {
          description: "Vui lòng kiểm tra lại kết nối API backend.",
        });
      })
      .finally(() => setLoading(false));
  }, []);

  React.useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleExport = () => {
    toast.success("Xuất dữ liệu danh mục", {
      description: "File CSV danh sách danh mục tour đã được khởi tạo thành công.",
    });
  };

  const handleOpenCreateModal = () => {
    setEditingCategory(null);
    setFormData({ name: "", description: "" });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (cat: CategoryResponse) => {
    setEditingCategory(cat);
    setFormData({ name: cat.name, description: cat.description || "" });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error("Tên danh mục không được để trống!");
      return;
    }

    setSubmitting(true);
    try {
      if (editingCategory) {
        await updateCategory(editingCategory.id, formData);
        toast.success("Cập nhật danh mục thành công!");
      } else {
        await createCategory(formData);
        toast.success("Tạo danh mục mới thành công!");
      }
      setIsModalOpen(false);
      fetchCategories();
    } catch (err: any) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Có lỗi xảy ra khi lưu danh mục!");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingId) return;
    setDeleting(true);
    try {
      await deleteCategory(deletingId);
      toast.success("Xóa danh mục thành công!");
      setDeletingId(null);
      fetchCategories();
    } catch (err: any) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Không thể xóa danh mục này!");
    } finally {
      setDeleting(false);
    }
  };

  const filteredCategories = categories.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      (c.description && c.description.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Top Header & Action Bar */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <Link
            to="/admin"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mb-1"
          >
            <ArrowLeftIcon className="size-3.5" />
            <span>Quay lại Dashboard</span>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Quản lý Danh mục Tour
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Phân loại, tổ chức các chủ đề danh mục du lịch và dịch vụ trên hệ thống.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleExport}
            className="text-xs gap-1.5 shadow-2xs hover:bg-muted"
          >
            <DownloadIcon className="size-3.5" />
            <span>Export</span>
          </Button>
          <Button
            size="sm"
            onClick={handleOpenCreateModal}
            className="text-xs gap-1.5 shadow-2xs bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <PlusCircleIcon className="size-3.5" />
            <span>Thêm Danh mục</span>
          </Button>
        </div>
      </div>

      {/* KPI / Metric Cards Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-xs border-border/80 transition-all hover:shadow-sm">
          <CardHeader className="pb-2">
            <CardDescription className="text-xs font-semibold text-muted-foreground">
              Tổng số Danh mục
            </CardDescription>
            <CardTitle className="text-2xl font-bold tracking-tight text-foreground">
              {categories.length}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-center gap-1 text-xs text-emerald-600 font-medium">
              <TrendingUpIcon className="size-3" />
              <span>Đang hoạt động trên hệ thống</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-xs border-border/80 transition-all hover:shadow-sm">
          <CardHeader className="pb-2">
            <CardDescription className="text-xs font-semibold text-muted-foreground">
              Danh mục Tiêu biểu
            </CardDescription>
            <CardTitle className="text-2xl font-bold tracking-tight text-foreground">
              Biển & Đảo
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <SparklesIcon className="size-3 text-amber-500" />
              <span>Nhiều tour ưa chuộng nhất</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-xs border-border/80 transition-all hover:shadow-sm">
          <CardHeader className="pb-2">
            <CardDescription className="text-xs font-semibold text-muted-foreground">
              Tỷ lệ Ánh xạ Tour
            </CardDescription>
            <CardTitle className="text-2xl font-bold tracking-tight text-foreground">
              100%
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-center gap-1 text-xs text-emerald-600 font-medium">
              <CheckCircle2Icon className="size-3" />
              <span>Đã kết nối dữ liệu tour</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-xs border-border/80 transition-all hover:shadow-sm">
          <CardHeader className="pb-2">
            <CardDescription className="text-xs font-semibold text-muted-foreground">
              Trạng thái API
            </CardDescription>
            <CardTitle className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <span>Operational</span>
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <span>Đồng bộ thời gian thực</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Table Card */}
      <Card className="shadow-xs border-border/80">
        <CardHeader className="border-b pb-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <LayersIcon className="size-4 text-primary" />
                <span>Danh sách Danh mục</span>
              </CardTitle>
              <CardDescription className="text-xs">
                Quản lý, tìm kiếm và cập nhật thông tin danh mục sản phẩm tour.
              </CardDescription>
            </div>

            <div className="relative w-full sm:w-64">
              <SearchIcon className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Tìm danh mục theo tên, mô tả..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-8 pl-8 text-xs bg-background"
              />
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {loading ? (
            <div className="py-16 flex items-center justify-center">
              <div className="size-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <Table>
              <TableHeader className="bg-muted/40">
                <TableRow>
                  <TableHead className="text-xs font-semibold pl-6 w-16">ID</TableHead>
                  <TableHead className="text-xs font-semibold">Tên danh mục</TableHead>
                  <TableHead className="text-xs font-semibold">Mô tả chi tiết</TableHead>
                  <TableHead className="text-xs font-semibold">Trạng thái</TableHead>
                  <TableHead className="text-xs font-semibold">Ngày khởi tạo</TableHead>
                  <TableHead className="text-xs font-semibold text-right pr-6">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCategories.length > 0 ? (
                  filteredCategories.map((cat) => (
                    <TableRow key={cat.id} className="hover:bg-muted/40 transition-colors">
                      <TableCell className="font-mono text-xs font-semibold text-muted-foreground pl-6">
                        #{cat.id}
                      </TableCell>
                      <TableCell className="font-bold text-xs text-foreground">
                        {cat.name}
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground max-w-md truncate">
                        {cat.description || <span className="italic text-muted-foreground/60">Chưa có mô tả</span>}
                      </TableCell>
                      <TableCell className="text-xs">
                        <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200">
                          Active
                        </Badge>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground font-mono">
                        {cat.createdAt ? new Date(cat.createdAt).toLocaleDateString("vi-VN") : "N/A"}
                      </TableCell>
                      <TableCell className="text-right pr-6 space-x-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-8 text-muted-foreground hover:text-primary"
                          onClick={() => handleOpenEditModal(cat)}
                          title="Chỉnh sửa danh mục"
                        >
                          <PencilIcon className="size-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-8 text-muted-foreground hover:text-destructive"
                          onClick={() => setDeletingId(cat.id)}
                          title="Xóa danh mục"
                        >
                          <Trash2Icon className="size-3.5" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center text-xs text-muted-foreground">
                      Không tìm thấy danh mục nào phù hợp.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}

          {/* Table Footer */}
          <div className="flex items-center justify-between px-6 py-3 border-t text-xs text-muted-foreground">
            <div>
              Hiển thị <span className="font-semibold text-foreground">{filteredCategories.length}</span> trong số{" "}
              <span className="font-semibold text-foreground">{categories.length}</span> danh mục
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modal Dialog: Create / Edit Category */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-xs">
          <Card className="relative w-full max-w-lg shadow-xl border-border/80">
            <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
              <div>
                <CardTitle className="text-lg font-bold">
                  {editingCategory ? `Chỉnh sửa Danh mục #${editingCategory.id}` : "Tạo mới Danh mục"}
                </CardTitle>
                <CardDescription className="text-xs">
                  Điền tên và mô tả chi tiết cho danh mục sản phẩm.
                </CardDescription>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="size-7 rounded-full"
                onClick={() => setIsModalOpen(false)}
              >
                <XIcon className="size-4" />
              </Button>
            </CardHeader>

            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4 pt-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground uppercase tracking-wider">
                    Tên danh mục <span className="text-destructive">*</span>
                  </label>
                  <Input
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ví dụ: Biển & Đảo, Du lịch Núi..."
                    className="text-xs h-9"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground uppercase tracking-wider">
                    Mô tả chi tiết
                  </label>
                  <textarea
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Mô tả thông tin chủ đề các tour thuộc danh mục này..."
                    className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-xs shadow-2xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  />
                </div>
              </CardContent>

              <div className="flex items-center justify-end gap-2 border-t p-4">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsModalOpen(false)}
                  className="text-xs"
                >
                  Hủy
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  disabled={submitting}
                  className="text-xs bg-primary text-primary-foreground hover:bg-primary/90 gap-1.5"
                >
                  {submitting && <Loader2Icon className="size-3.5 animate-spin" />}
                  <span>{editingCategory ? "Cập nhật" : "Tạo mới"}</span>
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}

      {/* Modal Dialog: Delete Confirm */}
      {deletingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-xs">
          <Card className="relative w-full max-w-md shadow-xl border-border/80 text-center">
            <CardHeader className="pb-2">
              <div className="size-10 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-2">
                <AlertCircleIcon className="size-5" />
              </div>
              <CardTitle className="text-base font-bold">Xác nhận xóa Danh mục #{deletingId}?</CardTitle>
              <CardDescription className="text-xs leading-relaxed">
                Hành động này không thể hoàn tác nếu danh mục đã chứa tour.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center gap-2 pt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setDeletingId(null)}
                className="text-xs"
              >
                Hủy bỏ
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={handleDelete}
                disabled={deleting}
                className="text-xs gap-1.5"
              >
                {deleting && <Loader2Icon className="size-3.5 animate-spin" />}
                <span>Xóa danh mục</span>
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
