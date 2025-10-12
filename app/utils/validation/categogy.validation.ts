import { toast } from "react-hot-toast";

export interface CategogyValidationInput {
    name?: string;
}
const VALID_TITLE_REGEX = /^[a-zA-ZÀ-ỹ0-9\s.,()'"“”‘’:;?!_\-–—]+$/;

export function validateCategogyForm({
    name,
}: CategogyValidationInput): boolean {
    // ====== TÊN THỂ LOẠI ======
    if (!name || !name.trim()) {
        toast.error("Tên thể loại không được để trống");
        return false;
    }
    if (name.length > 100) {
        toast.error("Tên thể loại không được vượt quá 100 ký tự");
        return false;
    }
    if (!VALID_TITLE_REGEX.test(name)) {
        toast.error("Tên thể loại chứa ký tự không hợp lệ");
        return false;
    }

    return true;
}