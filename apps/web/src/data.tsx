import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Student = {
  id: string;
  name: string;
  admission: string;
  className: string;
  status: "Active" | "Inactive";
};

export type Invoice = {
  id: string;
  studentId: string;
  description: string;
  amount: number;
};

export type Payment = {
  id: string;
  studentId: string;
  invoiceId: string;
  amount: number;
  method: "Cash" | "Bank transfer";
  reference: string;
  status: "Pending" | "Verified" | "Rejected" | "Reversed";
  date: string;
};

type SchoolDataState = {
  students: Student[];
  invoices: Invoice[];
  payments: Payment[];
  settings: SchoolSettings;
};

export type SchoolSettings = {
  schoolName: string;
  schoolAddress: string;
  contactEmail: string;
  receiptPrefix: string;
  supportPhone: string;
  academicTerm: string;
};

type SchoolData = SchoolDataState & {
  updateSettings: (settings: SchoolSettings) => void;
  addStudent: (student: Omit<Student, "id">, invoiceAmount: number) => void;
  addInvoice: (invoice: Omit<Invoice, "id">) => void;
  addPayment: (payment: Omit<Payment, "id" | "status"> & { status: Payment["status"] }) => void;
  verifyPayment: (paymentId: string) => void;
};

const STORAGE_KEY = "school-paypoint-demo-v1";

const initialState: SchoolDataState = {
  students: [
    { id: "student-018", name: "Adekunle Oluwatobi", admission: "SPP-2024-018", className: "JSS 2A", status: "Active" },
    { id: "student-032", name: "Ngozi Chukwu", admission: "SPP-2024-032", className: "SS 1B", status: "Active" },
    { id: "student-009", name: "David Ibrahim", admission: "SPP-2024-009", className: "JSS 3A", status: "Active" },
    { id: "student-041", name: "Fatima Bello", admission: "SPP-2024-041", className: "SS 2A", status: "Active" },
    { id: "student-055", name: "Mariam Adeyemi", admission: "SPP-2024-055", className: "JSS 1C", status: "Active" },
  ],
  invoices: [
    { id: "invoice-018", studentId: "student-018", description: "Tuition — Third Term", amount: 100000 },
    { id: "invoice-032", studentId: "student-032", description: "Full fees — First Term", amount: 100000 },
    { id: "invoice-009", studentId: "student-009", description: "Development levy", amount: 60000 },
    { id: "invoice-041", studentId: "student-041", description: "Tuition — Third Term", amount: 80000 },
    { id: "invoice-055", studentId: "student-055", description: "Full fees — First Term", amount: 120000 },
  ],
  payments: [
    { id: "payment-1", studentId: "student-018", invoiceId: "invoice-018", amount: 85000, method: "Bank transfer", reference: "TRF-20094", status: "Verified", date: "2026-11-19" },
    { id: "payment-2", studentId: "student-032", invoiceId: "invoice-032", amount: 25000, method: "Cash", reference: "CASH-10294", status: "Verified", date: "2026-11-19" },
    { id: "payment-3", studentId: "student-009", invoiceId: "invoice-009", amount: 60000, method: "Bank transfer", reference: "TRF-20994", status: "Pending", date: "2026-11-18" },
    { id: "payment-4", studentId: "student-041", invoiceId: "invoice-041", amount: 40000, method: "Cash", reference: "CASH-10494", status: "Verified", date: "2026-11-18" },
  ],
  settings: {
    schoolName: "Grace College",
    schoolAddress: "12 Liberation Road, Lagos",
    contactEmail: "accounts@grace.edu",
    receiptPrefix: "RCP",
    supportPhone: "+234 800 000 0000",
    academicTerm: "Third Term",
  },
};

function isSchoolDataState(value: unknown): value is SchoolDataState {
  if (!value || typeof value !== "object") return false;
  const state = value as Record<string, unknown>;
  return Array.isArray(state.students) && Array.isArray(state.invoices) && Array.isArray(state.payments);
}

function loadState(): SchoolDataState {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return initialState;
    const parsed: unknown = JSON.parse(saved);
    if (isSchoolDataState(parsed)) {
      return {
        ...initialState,
        ...parsed,
        settings: { ...initialState.settings, ...parsed.settings },
      };
    }
    console.error("Saved School PayPoint demo data has an invalid shape. Using the sample data.");
  } catch (error) {
    console.error("Could not load saved School PayPoint demo data.", error);
  }
  return initialState;
}

const SchoolDataContext = createContext<SchoolData | null>(null);

export function SchoolDataProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState(loadState);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.error("Could not save School PayPoint demo data.", error);
    }
  }, [state]);

  const value = useMemo<SchoolData>(() => ({
    ...state,
    updateSettings: (settings) => setState((current) => ({ ...current, settings })),
    addStudent: (student, invoiceAmount) => {
      const id = crypto.randomUUID();
      const admissionNumber = student.admission.trim();
      if (state.students.some((existing) => existing.admission.toLowerCase() === admissionNumber.toLowerCase())) {
        throw new Error("That admission number is already in use.");
      }
      setState((current) => ({
        ...current,
        students: [...current.students, { ...student, id, admission: admissionNumber }],
        invoices: [...current.invoices, {
          id: crypto.randomUUID(),
          studentId: id,
          description: "Opening balance",
          amount: invoiceAmount,
        }],
      }));
    },
    addInvoice: (invoice) => {
      if (!state.students.some((student) => student.id === invoice.studentId)) {
        throw new Error("Select a valid student.");
      }
      if (!invoice.description.trim()) throw new Error("Enter an invoice description.");
      if (!Number.isFinite(invoice.amount) || invoice.amount <= 0) throw new Error("Enter an invoice amount greater than zero.");
      setState((current) => ({
        ...current,
        invoices: [...current.invoices, { ...invoice, description: invoice.description.trim(), id: crypto.randomUUID() }],
      }));
    },
    addPayment: (payment) => {
      if (!Number.isFinite(payment.amount) || payment.amount <= 0) {
        throw new Error("Enter a valid payment amount.");
      }
      if (payment.method === "Bank transfer" && !payment.reference.trim()) {
        throw new Error("A transfer reference is required.");
      }
      if (payment.method === "Bank transfer" && state.payments.some((existing) =>
        existing.method === "Bank transfer" && existing.reference.toLowerCase() === payment.reference.trim().toLowerCase(),
      )) {
        throw new Error("That transfer reference has already been recorded.");
      }
      const invoice = state.invoices.find((item) => item.id === payment.invoiceId && item.studentId === payment.studentId);
      if (!invoice) throw new Error("Select an invoice belonging to this student.");
      const allocated = state.payments
        .filter((item) => item.invoiceId === invoice.id && item.status !== "Rejected" && item.status !== "Reversed")
        .reduce((total, item) => total + item.amount, 0);
      if (payment.amount > invoice.amount - allocated) {
        throw new Error("The payment exceeds the invoice's remaining balance.");
      }
      setState((current) => ({
        ...current,
        payments: [...current.payments, { ...payment, id: crypto.randomUUID(), reference: payment.reference.trim() }],
      }));
    },
    verifyPayment: (paymentId) => {
      const payment = state.payments.find((item) => item.id === paymentId);
      if (!payment || payment.status !== "Pending") {
        throw new Error("Only pending payments can be verified.");
      }
      setState((current) => ({
        ...current,
        payments: current.payments.map((item) =>
          item.id === paymentId ? { ...item, status: "Verified" } : item,
        ),
      }));
    },
  }), [state]);

  return <SchoolDataContext.Provider value={value}>{children}</SchoolDataContext.Provider>;
}

export function useSchoolData() {
  const value = useContext(SchoolDataContext);
  if (!value) throw new Error("useSchoolData must be used within SchoolDataProvider.");
  return value;
}

export function formatNaira(amount: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);
}
