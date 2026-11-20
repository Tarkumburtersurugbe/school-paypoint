import { useState, type FormEvent } from "react";
import { NavLink, Route, Routes, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  BadgeDollarSign,
  Banknote,
  BarChart3,
  Bell,
  Building2,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  CreditCard,
  Download,
  FileText,
  GraduationCap,
  Landmark,
  LayoutDashboard,
  LockKeyhole,
  Menu,
  Printer,
  Search,
  ShieldCheck,
  Settings,
  UserPlus,
  Users,
  UserRound,
  WalletCards,
  X,
} from "lucide-react";
import { formatNaira, SchoolDataProvider, useSchoolData, type Payment, type SchoolSettings } from "./data";

type NavItem = {
  label: string;
  path: string;
  icon: typeof LayoutDashboard;
};

const navItems: NavItem[] = [
  { label: "Overview", path: "/dashboard", icon: LayoutDashboard },
  { label: "Students", path: "/students", icon: GraduationCap },
  { label: "Parents", path: "/parents", icon: Users },
  { label: "Classes & Terms", path: "/academics", icon: CalendarDays },
  { label: "Fee Setup", path: "/fees", icon: CreditCard },
  { label: "Payments", path: "/payments", icon: WalletCards },
  { label: "Invoices", path: "/invoices", icon: FileText },
  { label: "Receipts", path: "/receipts", icon: BadgeDollarSign },
  { label: "Staff", path: "/staff", icon: ShieldCheck },
  { label: "Reports", path: "/reports", icon: BarChart3 },
  { label: "Reconciliation", path: "/reconciliation", icon: Landmark },
];

function App() {
  return <SchoolDataProvider><AppContent /></SchoolDataProvider>;
}

function AppContent() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"Cash" | "Bank transfer">("Cash");
  const { settings } = useSchoolData();
  const location = useLocation();
  const publicPaths = ["/", "/login", "/register", "/forgot-password", "/receipt-verification"];
  const publicPage = publicPaths.includes(location.pathname) || location.pathname.startsWith("/receipt-verification/");

  if (publicPage) {
    return (
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<AuthPage mode="login" />} />
        <Route path="/register" element={<AuthPage mode="register" />} />
        <Route path="/forgot-password" element={<AuthPage mode="forgot" />} />
        <Route path="/receipt-verification" element={<ReceiptVerificationPage />} />
        <Route path="/receipt-verification/:code" element={<ReceiptVerificationPage />} />
      </Routes>
    );
  }

  if (location.pathname === "/cashier") return <RoleWorkspace mode="cashier" />;
  if (location.pathname === "/parent") return <RoleWorkspace mode="parent" />;
  if (location.pathname === "/platform") return <RoleWorkspace mode="platform" />;

  const pageTitle = navItems.find((item) =>
    item.path === "/" ? location.pathname === "/" : location.pathname.startsWith(item.path),
  )?.label ?? (location.pathname === "/settings" ? "Settings" : "Overview");

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileNavOpen ? "sidebar-open" : ""}`}>
        <div className="brand">
          <div className="brand-mark"><GraduationCap size={21} strokeWidth={2.2} /></div>
          <span>School PayPoint</span>
          <button className="icon-button sidebar-close" onClick={() => setMobileNavOpen(false)} aria-label="Close navigation">
            <X size={20} />
          </button>
        </div>

        <div className="school-switcher">
          <div className="school-avatar">GC</div>
          <div className="school-switcher-text">
            <strong>{settings.schoolName}</strong>
            <span>Administrator</span>
          </div>
          <ChevronDown size={16} />
        </div>

        <nav className="primary-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              onClick={() => setMobileNavOpen(false)}
              className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
            >
              <item.icon size={18} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <NavLink to="/settings" className="nav-item">
            <Settings size={18} />
            <span>Settings</span>
          </NavLink>
          <button className="support-link">
            <CircleHelp size={18} />
            <span>Help & support</span>
          </button>
        </div>
      </aside>

      {mobileNavOpen && <button className="nav-backdrop" onClick={() => setMobileNavOpen(false)} aria-label="Close navigation" />}

      <div className="workspace">
        <header className="topbar">
          <div className="topbar-left">
            <button className="icon-button menu-button" onClick={() => setMobileNavOpen(true)} aria-label="Open navigation">
              <Menu size={21} />
            </button>
            <div>
              <span className="eyebrow">{settings.schoolName}</span>
              <h1>{pageTitle}</h1>
            </div>
          </div>
          <div className="topbar-actions">
            <label className="global-search">
              <Search size={17} />
              <input aria-label="Search" placeholder="Search anything..." />
              <kbd>⌘ K</kbd>
            </label>
            <button className="icon-button notification-button" aria-label="Notifications">
              <Bell size={19} />
              <span className="notification-dot" />
            </button>
            <button className="profile-button" aria-label="Open profile menu">
              <div className="profile-avatar">OA</div>
              <div className="profile-copy">
                <strong>Oluwaseun A.</strong>
                <span>School Admin</span>
              </div>
              <ChevronDown size={15} />
            </button>
          </div>
        </header>

        <main className="main-content">
          <Routes>
            <Route path="/dashboard" element={<Dashboard onRecordPayment={(method) => { setPaymentMethod(method ?? "Cash"); setPaymentModalOpen(true); }} />} />
            <Route path="/students" element={<StudentsPage />} />
            <Route path="/parents" element={<ParentsPage />} />
            <Route path="/academics" element={<AcademicsPage />} />
            <Route path="/fees" element={<FeeSetupPage />} />
            <Route path="/payments" element={<PaymentsPage onRecordPayment={(method) => { setPaymentMethod(method ?? "Cash"); setPaymentModalOpen(true); }} />} />
            <Route path="/invoices" element={<InvoicesPage />} />
            <Route path="/receipts" element={<ReceiptsPage />} />
            <Route path="/staff" element={<StaffPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/reconciliation" element={<ReconciliationPage />} />
            <Route path="/settings" element={<SchoolSettingsPage />} />
          </Routes>
        </main>
      </div>
      {paymentModalOpen && <PaymentModal initialMethod={paymentMethod} onClose={() => setPaymentModalOpen(false)} />}
    </div>
  );
}

function LandingPage() {
  return (
    <div className="landing-page">
      <header className="landing-header">
        <NavLink className="landing-brand" to="/" aria-label="School PayPoint home">
          <span className="brand-mark"><GraduationCap size={21} strokeWidth={2.2} /></span>
          <span>School PayPoint</span>
        </NavLink>
        <nav className="landing-nav" aria-label="Main navigation">
          <a href="#how-it-works">How it works</a>
          <a href="#features">Features</a>
          <NavLink className="landing-login" to="/login">Sign in</NavLink>
          <NavLink className="primary-button landing-cta" to="/register">Register your school <ChevronRight size={16} /></NavLink>
        </nav>
      </header>

      <main>
        <section className="landing-hero">
          <div className="landing-hero-copy">
            <div className="landing-eyebrow"><span /> SCHOOL FEES, MADE CLEAR</div>
            <h1>School payments,<br /><span>finally in order.</span></h1>
            <p className="landing-lede">A simpler way for Nigerian schools to record fees, track what is outstanding and give every payment a proper receipt.</p>
            <div className="landing-actions">
              <NavLink className="primary-button landing-primary" to="/register">Get started <ChevronRight size={17} /></NavLink>
              <NavLink className="landing-demo" to="/dashboard"><span className="landing-play">▶</span> Explore the demo</NavLink>
            </div>
            <div className="landing-trust"><ShieldCheck size={17} /><span>Clear records. Verified payments. No online payment processing.</span></div>
          </div>
          <div className="landing-preview" aria-label="Illustration of the School PayPoint dashboard">
            <div className="preview-window">
              <div className="preview-sidebar">
                <div className="preview-logo"><GraduationCap size={16} /></div>
                <span className="preview-nav-active"><LayoutDashboard size={14} /></span>
                <span><Users size={14} /></span>
                <span><WalletCards size={14} /></span>
                <span><FileText size={14} /></span>
              </div>
              <div className="preview-main">
                <div className="preview-topline"><span>Grace College</span><span className="preview-user">OA</span></div>
                <div className="preview-heading"><div><strong>Good morning, Oluwaseun</strong><small>Here is your school at a glance</small></div><span className="preview-action">+ Record payment</span></div>
                <div className="preview-stats">
                  <div><small>FEES BILLED</small><strong>₦1,240,000</strong><span className="preview-indicator blue" /></div>
                  <div><small>COLLECTED</small><strong>₦210,000</strong><span className="preview-indicator green" /></div>
                  <div><small>OUTSTANDING</small><strong>₦1,030,000</strong><span className="preview-indicator orange" /></div>
                </div>
                <div className="preview-table">
                  <div className="preview-table-title"><strong>Recent payments</strong><span>View all →</span></div>
                  <div className="preview-row"><i className="preview-avatar">AO</i><span><b>Adekunle Oluwatobi</b><small>SPP-2024-018</small></span><strong>₦85,000</strong><em>Verified</em></div>
                  <div className="preview-row"><i className="preview-avatar violet">NC</i><span><b>Ngozi Chukwu</b><small>SPP-2024-032</small></span><strong>₦25,000</strong><em>Verified</em></div>
                  <div className="preview-row"><i className="preview-avatar gold">DI</i><span><b>David Ibrahim</b><small>SPP-2024-009</small></span><strong>₦60,000</strong><em className="preview-pending">Pending</em></div>
                </div>
              </div>
            </div>
            <div className="preview-note"><span className="preview-note-icon"><ShieldCheck size={18} /></span><span><strong>Every payment accounted for</strong><small>One clear record at a time</small></span></div>
          </div>
          <div className="landing-hero-orb" />
        </section>

        <section className="landing-value-strip" aria-label="Product benefits">
          <div><span className="value-icon"><Users size={18} /></span><span><strong>Know what is owed</strong><small>Balances at a glance</small></span></div>
          <div><span className="value-icon"><WalletCards size={18} /></span><span><strong>Record every payment</strong><small>Cash or bank transfer</small></span></div>
          <div><span className="value-icon"><FileText size={18} /></span><span><strong>Issue clear receipts</strong><small>Print, sign and share</small></span></div>
          <div><span className="value-icon"><ShieldCheck size={18} /></span><span><strong>Keep teams accountable</strong><small>Reliable financial history</small></span></div>
        </section>

        <section className="landing-features" id="features">
          <div className="landing-section-heading">
            <span className="landing-eyebrow">MADE FOR SCHOOL FINANCE TEAMS</span>
            <h2>Less paperwork.<br /><span>More peace of mind.</span></h2>
            <p>Keep fee records, payment history and receipts together—so your team can spend less time chasing paperwork and more time supporting your school.</p>
          </div>
          <div className="landing-feature-cards">
            <article className="landing-feature-card">
              <span className="feature-icon feature-blue"><Users size={20} /></span>
              <h3>See each student’s balance</h3>
              <p>Keep student records and fee statements together. Quickly see what has been billed, paid and remains outstanding.</p>
              <NavLink to="/register">Explore student records <ChevronRight size={15} /></NavLink>
            </article>
            <article className="landing-feature-card">
              <span className="feature-icon feature-green"><WalletCards size={20} /></span>
              <h3>Record payments with confidence</h3>
              <p>Record cash received and bank transfers checked against your school’s actual bank account. Partial payments stay easy to follow.</p>
              <NavLink to="/register">Explore payment tracking <ChevronRight size={15} /></NavLink>
            </article>
            <article className="landing-feature-card">
              <span className="feature-icon feature-orange"><BadgeDollarSign size={20} /></span>
              <h3>Give every payment a receipt</h3>
              <p>Create a clear receipt for verified payments, ready for your cashier to print and sign for the parent.</p>
              <NavLink to="/register">Explore receipts <ChevronRight size={15} /></NavLink>
            </article>
          </div>
        </section>

        <section className="landing-workflow" id="how-it-works">
          <div>
            <span className="landing-eyebrow">SIMPLE BY DESIGN</span>
            <h2>From payment to<br /><span>peace of mind.</span></h2>
            <p>School PayPoint keeps the process straightforward while your school receives payments through its usual channels.</p>
            <NavLink className="primary-button landing-primary" to="/register">Bring your records together <ChevronRight size={17} /></NavLink>
          </div>
          <ol className="workflow-steps">
            <li><span>01</span><div><strong>Set up your school</strong><p>Add your school details, students and fee records.</p></div></li>
            <li><span>02</span><div><strong>Record money received</strong><p>Log cash or a transfer after checking it reached your account.</p></div></li>
            <li><span>03</span><div><strong>Print a signed receipt</strong><p>Give parents a clear record of every verified payment.</p></div></li>
          </ol>
        </section>

        <section className="landing-bottom-cta">
          <div><span className="landing-eyebrow">A CLEARER WAY TO MANAGE SCHOOL FEES</span><h2>Ready to bring your records together?</h2><p>Start building a more organised picture of school payments.</p></div>
          <NavLink className="primary-button landing-primary" to="/register">Register your school <ChevronRight size={17} /></NavLink>
        </section>
      </main>
      <footer className="landing-footer">
        <NavLink className="landing-brand" to="/"><span className="brand-mark"><GraduationCap size={20} /></span><span>School PayPoint</span></NavLink>
        <span>School fee records, made clearer.</span>
        <div><NavLink to="/login">Sign in</NavLink><NavLink to="/register">Register a school</NavLink><NavLink to="/receipt-verification">Verify a receipt</NavLink></div>
      </footer>
    </div>
  );
}

function invoicePaid(invoiceId: string, payments: Payment[]) {
  return payments
    .filter((payment) => payment.invoiceId === invoiceId && payment.status === "Verified")
    .reduce((total, payment) => total + payment.amount, 0);
}

function receiptNumber(paymentId: string, prefix: string) {
  return `${prefix}-${paymentId.replace(/\D/g, "").padStart(6, "0")}`;
}

function paymentStudentName(payment: Payment, students: ReturnType<typeof useSchoolData>["students"]) {
  return students.find((student) => student.id === payment.studentId)?.name ?? "Unknown student";
}

function exportCsv(filename: string, rows: string[][]) {
  const csv = rows.map((row) => row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(",")).join("\r\n");
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function Dashboard({ onRecordPayment }: { onRecordPayment: (method?: "Cash" | "Bank transfer") => void }) {
  const { students, invoices, payments } = useSchoolData();
  const navigate = useNavigate();
  const billed = invoices.reduce((total, invoice) => total + invoice.amount, 0);
  const collected = payments.filter((payment) => payment.status === "Verified").reduce((total, payment) => total + payment.amount, 0);
  const outstanding = Math.max(0, billed - collected);
  const recentPayments = [...payments].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 4);
  return (
    <>
      <div className="page-heading">
        <div>
          <div className="heading-row">
            <h2>Good morning, Oluwaseun</h2>
            <span className="preview-badge">Preview data</span>
          </div>
          <p>Here is what is happening at Grace College today.</p>
        </div>
        <button className="primary-button" onClick={() => onRecordPayment("Cash")}><span>+</span> Record payment</button>
      </div>

      <section className="stats-grid" aria-label="Financial summary">
        <StatCard label="Total students" value={String(students.length)} change="Active student records" icon={Users} tone="blue" />
        <StatCard label="Fees billed" value={formatNaira(billed)} change={`${invoices.length} invoices`} icon={FileText} tone="purple" />
        <StatCard label="Amount collected" value={formatNaira(collected)} change="Verified payments only" icon={WalletCards} tone="green" />
        <StatCard label="Outstanding balance" value={formatNaira(outstanding)} change="Across all invoices" icon={Banknote} tone="orange" />
      </section>

      <section className="dashboard-grid">
        <div className="card collection-card">
          <div className="card-header">
            <div>
              <h3>Collection overview</h3>
              <p>September 2025</p>
            </div>
            <button className="secondary-button" onClick={() => navigate("/reports")}>View reports <ChevronRight size={14} /></button>
          </div>
          <div className="chart-summary">
            <div>
              <strong>{formatNaira(collected)}</strong>
              <span>Verified payments recorded</span>
            </div>
          </div>
          <div className="bar-chart" aria-label="Monthly collection chart">
            {[38, 52, 43, 70, 58, 84, 67, 76, 63, 91, 72, 88].map((height, index) => (
              <div className="bar-column" key={index}>
                <div className="bar-track">
                  <div className={`bar ${index === 9 ? "bar-highlight" : ""}`} style={{ height: `${height}%` }} />
                </div>
                {index % 2 === 0 && <span>{["Sep", "Nov", "Jan", "Mar", "May", "Jul"][index / 2]}</span>}
              </div>
            ))}
          </div>
        </div>

        <div className="card quick-card">
          <div className="card-header">
            <div>
              <h3>Quick actions</h3>
              <p>Common tasks</p>
            </div>
          </div>
          <div className="quick-actions">
            <button onClick={() => onRecordPayment("Cash")}><span className="quick-icon green"><Banknote size={18} /></span><span>Record cash</span><ChevronRight size={16} /></button>
            <button onClick={() => onRecordPayment("Bank transfer")}><span className="quick-icon blue"><WalletCards size={18} /></span><span>Record transfer</span><ChevronRight size={16} /></button>
            <button onClick={() => navigate("/students")}><span className="quick-icon purple"><UserRound size={18} /></span><span>Find student</span><ChevronRight size={16} /></button>
            <button onClick={() => navigate("/receipts")}><span className="quick-icon orange"><FileText size={18} /></span><span>View receipts</span><ChevronRight size={16} /></button>
          </div>
        </div>
      </section>

      <section className="card payments-card">
        <div className="card-header">
          <div>
            <h3>Recent payments</h3>
            <p>Latest student fee transactions</p>
          </div>
          <button className="text-button">View all <ChevronRight size={15} /></button>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>Student</th><th>Amount</th><th>Method</th><th>Status</th><th>Time</th><th /></tr>
            </thead>
            <tbody>
              {recentPayments.map((payment) => {
                const student = students.find((item) => item.id === payment.studentId);
                const name = paymentStudentName(payment, students);
                return <tr key={payment.id}>
                  <td><div className="student-cell"><div className="student-avatar">{name.split(" ").map((n) => n[0]).join("")}</div><div><strong>{name}</strong><span>{student?.admission ?? "—"}</span></div></div></td>
                  <td><strong>{formatNaira(payment.amount)}</strong></td>
                  <td>{payment.method}</td>
                  <td><span className={`status ${payment.status.toLowerCase()}`}>{payment.status}</span></td>
                  <td>{payment.date}</td>
                  <td><button className="row-action" onClick={() => navigate("/payments")} aria-label={`Open payment for ${name}`}><ChevronRight size={16} /></button></td>
                </tr>;
              })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

function StatCard({ label, value, change, icon: Icon, tone }: {
  label: string;
  value: string;
  change: string;
  icon: typeof Users;
  tone: "blue" | "purple" | "green" | "orange";
}) {
  return (
    <article className="stat-card">
      <div className={`stat-icon ${tone}`}><Icon size={20} /></div>
      <div className="stat-copy">
        <span>{label}</span>
        <strong>{value}</strong>
        <small>{change}</small>
      </div>
    </article>
  );
}

function StudentsPage() {
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("All classes");
  const [addStudentOpen, setAddStudentOpen] = useState(false);
  const { students, invoices, payments } = useSchoolData();
  const classes = [...new Set(students.map((student) => student.className))];
  const filteredStudents = students.filter((student) =>
    `${student.name} ${student.admission}`.toLowerCase().includes(search.toLowerCase())
    && (classFilter === "All classes" || student.className === classFilter),
  );

  return (
    <>
      <div className="page-heading">
        <div>
          <h2>Students</h2>
          <p>Manage student records and fee statements.</p>
        </div>
        <button className="primary-button" onClick={() => setAddStudentOpen(true)}><span>+</span> Add student</button>
      </div>
      <section className="card">
        <div className="card-header students-toolbar">
          <label className="table-search"><Search size={16} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search by name or admission number" /></label>
          <select className="secondary-button" value={classFilter} onChange={(event) => setClassFilter(event.target.value)}>
            <option>All classes</option>{classes.map((className) => <option key={className}>{className}</option>)}
          </select>
        </div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Student</th><th>Admission no.</th><th>Class</th><th>Outstanding</th><th>Status</th><th /></tr></thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.admission}>
                  <td><div className="student-cell"><div className="student-avatar">{student.name.split(" ").map((n) => n[0]).join("")}</div><strong>{student.name}</strong></div></td>
                  <td>{student.admission}</td><td>{student.className}</td>
                  <td><strong>{formatNaira(invoices.filter((invoice) => invoice.studentId === student.id).reduce((total, invoice) => total + invoice.amount - invoicePaid(invoice.id, payments), 0))}</strong></td>
                  <td><span className="status verified">{student.status}</span></td>
                  <td><button className="row-action" aria-label={`Open ${student.name}`}><ChevronRight size={16} /></button></td>
                </tr>
              ))}
              {filteredStudents.length === 0 && (
                <tr><td colSpan={6}><div className="table-empty">No students match your search.</div></td></tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
      {addStudentOpen && <StudentModal onClose={() => setAddStudentOpen(false)} />}
    </>
  );
}

function StudentModal({ onClose }: { onClose: () => void }) {
  const { addStudent } = useSchoolData();
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({ name: "", admission: "", className: "JSS 1A", invoiceAmount: "0" });

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    try {
      const invoiceAmount = Number(form.invoiceAmount);
      if (!Number.isFinite(invoiceAmount) || invoiceAmount < 0) throw new Error("Enter a valid opening balance.");
      addStudent(
        { name: form.name.trim(), admission: form.admission.trim(), className: form.className, status: "Active" },
        invoiceAmount,
      );
      setSaved(true);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "The student could not be saved.");
    }
  }

  return <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
    <section className="modal-card" role="dialog" aria-modal="true" aria-label="Add student">
      {saved ? <div className="success-modal"><div className="success-icon"><Users size={24} /></div><h3>Student added</h3><p>The student and opening invoice are now available across the demo workspace.</p><button className="primary-button" onClick={onClose}>Done</button></div> : <>
        <div className="modal-header"><div><h3>Add student</h3><p>Create a student record and optional opening invoice.</p></div><button className="icon-button" onClick={onClose} aria-label="Close"><X size={18} /></button></div>
        <form onSubmit={submit}>
          <label className="form-field"><span>Full name</span><input required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} /></label>
          <div className="form-grid">
            <label className="form-field"><span>Admission number</span><input required value={form.admission} onChange={(event) => setForm({ ...form, admission: event.target.value })} placeholder="SPP-2026-001" /></label>
            <label className="form-field"><span>Class</span><select value={form.className} onChange={(event) => setForm({ ...form, className: event.target.value })}>{["JSS 1A", "JSS 2A", "JSS 3A", "SS 1B", "SS 2A"].map((item) => <option key={item}>{item}</option>)}</select></label>
          </div>
          <label className="form-field"><span>Opening invoice amount (₦)</span><input type="number" min="0" step="0.01" value={form.invoiceAmount} onChange={(event) => setForm({ ...form, invoiceAmount: event.target.value })} /></label>
          {error && <p className="form-error" role="alert">{error}</p>}
          <div className="modal-actions"><button type="button" className="secondary-button" onClick={onClose}>Cancel</button><button type="submit" className="primary-button">Add student</button></div>
        </form>
      </>}
    </section>
  </div>;
}

function PaymentsPage({ onRecordPayment }: { onRecordPayment: (method?: "Cash" | "Bank transfer") => void }) {
  const { students, payments, verifyPayment } = useSchoolData();
  const [search, setSearch] = useState("");
  const [methodFilter, setMethodFilter] = useState("All methods");
  const [statusFilter, setStatusFilter] = useState("All statuses");
  const [message, setMessage] = useState("");
  const filteredPayments = [...payments].reverse().filter((payment) => {
    const searchText = `${paymentStudentName(payment, students)} ${payment.reference}`.toLowerCase();
    return searchText.includes(search.toLowerCase())
      && (methodFilter === "All methods" || payment.method === methodFilter)
      && (statusFilter === "All statuses" || payment.status === statusFilter);
  });

  function confirmPayment(paymentId: string) {
    if (!window.confirm("Confirm that the bank account has been credited for this transfer? Only verify after checking the actual account.")) return;
    try {
      verifyPayment(paymentId);
      setMessage("Payment verified. Its invoice balance and receipt eligibility have been updated.");
    } catch (reason) {
      setMessage(reason instanceof Error ? reason.message : "The payment could not be verified.");
    }
  }

  return (
    <>
      <div className="page-heading">
        <div><h2>Payments</h2><p>Record and review student payments.</p></div>
        <button className="primary-button" onClick={() => onRecordPayment("Cash")}><span>+</span> Record payment</button>
      </div>
      <section className="filter-card card">
        <label className="table-search"><Search size={16} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search student or reference" /></label>
        <select className="secondary-button" value={methodFilter} onChange={(event) => setMethodFilter(event.target.value)}><option>All methods</option><option>Cash</option><option>Bank transfer</option></select>
        <select className="secondary-button" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}><option>All statuses</option><option>Pending</option><option>Verified</option><option>Rejected</option><option>Reversed</option></select>
      </section>
      {message && <p className="inline-notice" role="status">{message}</p>}
      <section className="card payments-card">
        <div className="card-header">
          <div><h3>Payment history</h3><p>All recorded transactions</p></div>
        </div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Student</th><th>Amount</th><th>Method</th><th>Reference</th><th>Status</th><th>Date</th><th>Action</th></tr></thead>
            <tbody>
              {filteredPayments.map((payment) => (
                <tr key={payment.id}>
                  <td><div className="student-cell"><strong>{paymentStudentName(payment, students)}</strong></div></td>
                  <td><strong>{formatNaira(payment.amount)}</strong></td>
                  <td>{payment.method}</td>
                  <td>{payment.reference || "—"}</td>
                  <td><span className={`status ${payment.status.toLowerCase()}`}>{payment.status}</span></td>
                  <td>{payment.date}</td>
                  <td>{payment.status === "Pending" ? <button className="text-button" onClick={() => confirmPayment(payment.id)}>Verify</button> : "—"}</td>
                </tr>
              ))}
              {filteredPayments.length === 0 && <tr><td colSpan={7}><div className="table-empty">No payments match these filters.</div></td></tr>}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

function InvoicesPage() {
  const { students, invoices, payments, addInvoice } = useSchoolData();
  const [createOpen, setCreateOpen] = useState(false);
  return (
    <>
      <div className="page-heading"><div><h2>Invoices</h2><p>Track issued invoices and verified payment balances.</p></div><button className="primary-button" onClick={() => setCreateOpen(true)}><span>+</span> Create invoice</button></div>
      <section className="card table-card">
        <div className="table-wrap"><table>
          <thead><tr><th>Student</th><th>Invoice</th><th>Billed</th><th>Paid</th><th>Balance</th><th>Status</th></tr></thead>
          <tbody>{invoices.map((invoice) => {
            const student = students.find((item) => item.id === invoice.studentId);
            const paid = invoicePaid(invoice.id, payments);
            const balance = Math.max(0, invoice.amount - paid);
            const status = balance === 0 ? "Paid" : paid > 0 ? "Partially paid" : "Unpaid";
            return <tr key={invoice.id}>
              <td><strong>{student?.name ?? "Unknown student"}</strong><span className="cell-subtitle">{student?.admission}</span></td>
              <td>{invoice.description}</td><td>{formatNaira(invoice.amount)}</td><td>{formatNaira(paid)}</td><td><strong>{formatNaira(balance)}</strong></td>
              <td><span className={`status ${balance === 0 ? "verified" : paid > 0 ? "pending" : "unpaid"}`}>{status}</span></td>
            </tr>;
          })}</tbody>
        </table></div>
      </section>
      {createOpen && <InvoiceModal onClose={() => setCreateOpen(false)} onSave={addInvoice} />}
    </>
  );
}

function InvoiceModal({ onClose, onSave }: {
  onClose: () => void;
  onSave: (invoice: { studentId: string; description: string; amount: number }) => void;
}) {
  const { students } = useSchoolData();
  const [studentId, setStudentId] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    try {
      onSave({ studentId, description, amount: Number(amount) });
      onClose();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "The invoice could not be created.");
    }
  }

  return <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
    <section className="modal-card" role="dialog" aria-modal="true" aria-label="Create invoice">
      <div className="modal-header"><div><h3>Create invoice</h3><p>Issue a fee invoice to a student.</p></div><button className="icon-button" onClick={onClose} aria-label="Close"><X size={18} /></button></div>
      <form onSubmit={submit}>
        <label className="form-field"><span>Student</span><select required value={studentId} onChange={(event) => setStudentId(event.target.value)}><option value="" disabled>Select a student</option>{students.map((student) => <option key={student.id} value={student.id}>{student.name} — {student.admission}</option>)}</select></label>
        <label className="form-field"><span>Invoice description</span><input required value={description} onChange={(event) => setDescription(event.target.value)} placeholder="e.g. First term tuition" /></label>
        <label className="form-field"><span>Amount (₦)</span><input required type="number" min="0.01" step="0.01" value={amount} onChange={(event) => setAmount(event.target.value)} /></label>
        {error && <p className="form-error" role="alert">{error}</p>}
        <div className="modal-actions"><button type="button" className="secondary-button" onClick={onClose}>Cancel</button><button type="submit" className="primary-button">Create invoice</button></div>
      </form>
    </section>
  </div>;
}

function ReceiptsPage() {
  const { students, payments, settings } = useSchoolData();
  const receipts = payments.filter((payment) => payment.status === "Verified");
  return (
    <>
      <div className="page-heading"><div><h2>Receipts</h2><p>Preview, print and verify issued receipts.</p></div></div>
      {receipts.length === 0 ? <section className="card table-empty">Verified payments will appear here as official receipts.</section> : <section className="card receipt-grid">
        {receipts.map((payment) => {
          const student = students.find((item) => item.id === payment.studentId);
          const number = receiptNumber(payment.id, settings.receiptPrefix);
          return (
          <article className="receipt-card" key={payment.id}>
            <div className="receipt-top"><span>OFFICIAL RECEIPT</span><strong>{number}</strong></div>
            <div className="receipt-school"><strong>{settings.schoolName}</strong><span>{student?.className ?? ""}</span></div>
            <div className="receipt-details"><span>Received from</span><strong>{student?.name ?? "Unknown student"}</strong><span>Admission</span><strong>{student?.admission ?? "—"}</strong><span>Amount</span><strong>{formatNaira(payment.amount)}</strong><span>Method</span><strong>{payment.method}</strong><span>Payment date</span><strong>{payment.date}</strong>{settings.schoolAddress && <><span>School address</span><strong>{settings.schoolAddress}</strong></>}{settings.supportPhone && <><span>Support phone</span><strong>{settings.supportPhone}</strong></>}</div>
            <div className="receipt-actions"><NavLink className="secondary-button" to={`/receipt-verification/${number}`}>Verify</NavLink><button className="secondary-button" onClick={() => window.print()}><Printer size={15} /> Print</button></div>
          </article>
          );
        })}
      </section>}
    </>
  );
}

function ReportsPage() {
  const { invoices, payments } = useSchoolData();
  const verifiedPayments = payments.filter((payment) => payment.status === "Verified");
  const cashTotal = verifiedPayments.filter((payment) => payment.method === "Cash").reduce((total, payment) => total + payment.amount, 0);
  const transferTotal = verifiedPayments.filter((payment) => payment.method === "Bank transfer").reduce((total, payment) => total + payment.amount, 0);
  const billedTotal = invoices.reduce((total, invoice) => total + invoice.amount, 0);
  const outstandingTotal = Math.max(0, billedTotal - verifiedPayments.reduce((total, payment) => total + payment.amount, 0));
  const reversedTotal = payments.filter((payment) => payment.status === "Reversed").reduce((total, payment) => total + payment.amount, 0);

  return (
    <>
      <div className="page-heading"><div><h2>Financial Reports</h2><p>Totals include verified payments only.</p></div><button className="secondary-button" onClick={() => exportCsv("school-paypoint-report.csv", [
        ["Type", "Amount"],
        ["Cash collections", String(cashTotal)],
        ["Bank transfers", String(transferTotal)],
        ["Outstanding fees", String(outstandingTotal)],
        ["Reversals", String(reversedTotal)],
      ])}><Download size={15} /> Export CSV</button></div>
      <section className="stats-grid">
        <StatCard label="Cash collections" value={formatNaira(cashTotal)} change="Verified this period" icon={Banknote} tone="green" />
        <StatCard label="Bank transfers" value={formatNaira(transferTotal)} change="Verified this period" icon={WalletCards} tone="blue" />
        <StatCard label="Outstanding fees" value={formatNaira(outstandingTotal)} change="Across all invoices" icon={FileText} tone="orange" />
        <StatCard label="Reversals" value={formatNaira(reversedTotal)} change="Recorded reversals" icon={BarChart3} tone="purple" />
      </section>
    </>
  );
}

function PaymentModal({ initialMethod = "Cash", onClose }: { initialMethod?: "Cash" | "Bank transfer"; onClose: () => void }) {
  const { students, invoices, payments, addPayment } = useSchoolData();
  const [method, setMethod] = useState<"Cash" | "Bank transfer">(initialMethod);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [studentId, setStudentId] = useState("");
  const [invoiceId, setInvoiceId] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [reference, setReference] = useState("");
  const [cashConfirmed, setCashConfirmed] = useState(false);
  const studentInvoices = invoices.filter((invoice) => invoice.studentId === studentId);
  const selectedInvoice = studentInvoices.find((invoice) => invoice.id === invoiceId) ?? studentInvoices[0];
  const invoiceCommitted = selectedInvoice ? payments
    .filter((payment) => payment.invoiceId === selectedInvoice.id && payment.status !== "Rejected" && payment.status !== "Reversed")
    .reduce((total, payment) => total + payment.amount, 0) : 0;
  const remaining = selectedInvoice ? Math.max(0, selectedInvoice.amount - invoiceCommitted) : 0;

  function submitPayment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    try {
      if (!selectedInvoice) throw new Error("Select a student invoice before recording payment.");
      if (method === "Cash" && !cashConfirmed) throw new Error("Confirm that the physical cash has been received.");
      addPayment({
        studentId,
        invoiceId: selectedInvoice.id,
        amount: Number(amount),
        method,
        reference: method === "Bank transfer" ? reference : `CASH-${Date.now()}`,
        status: method === "Cash" ? "Verified" : "Pending",
        date,
      });
      setSubmitted(true);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "The payment could not be recorded.");
    }
  }

  if (submitted) {
    return (
      <div className="modal-backdrop" role="presentation">
        <section className="modal-card success-modal" role="dialog" aria-modal="true" aria-label="Payment recorded">
          <div className="success-icon"><BadgeDollarSign size={26} /></div>
          <h3>Payment recorded</h3>
          <p>{method === "Cash" ? "Cash receipt confirmed. The invoice balance and official receipt are updated." : "Transfer recorded as pending. Verify actual bank credit before it affects the balance or qualifies for a receipt."}</p>
          <button className="primary-button" onClick={onClose}>Done</button>
        </section>
      </div>
    );
  }

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="modal-card" role="dialog" aria-modal="true" aria-label="Record payment">
        <div className="modal-header"><div><h3>Record payment</h3><p>Add an external payment received by the school.</p></div><button className="icon-button" onClick={onClose} aria-label="Close"><X size={18} /></button></div>
        <form onSubmit={submitPayment}>
          <label className="form-field"><span>Student</span><select required value={studentId} onChange={(event) => { setStudentId(event.target.value); setInvoiceId(""); }}><option value="" disabled>Select a student</option>{students.map((student) => <option key={student.id} value={student.id}>{student.name} — {student.admission}</option>)}</select></label>
          <div className="form-grid">
            <label className="form-field"><span>Amount (₦)</span><input required type="number" min="0.01" max={remaining || undefined} step="0.01" inputMode="decimal" placeholder="0.00" value={amount} onChange={(event) => setAmount(event.target.value)} /></label>
            <label className="form-field"><span>Payment date</span><input required type="date" value={date} onChange={(event) => setDate(event.target.value)} /></label>
          </div>
          <fieldset className="method-field"><legend>Payment method</legend><div className="method-options">
            <button type="button" className={method === "Cash" ? "selected" : ""} onClick={() => setMethod("Cash")}><Banknote size={18} /><span>Cash</span></button>
            <button type="button" className={method === "Bank transfer" ? "selected" : ""} onClick={() => setMethod("Bank transfer")}><WalletCards size={18} /><span>Bank transfer</span></button>
          </div></fieldset>
          {method === "Bank transfer" && <label className="form-field"><span>Transfer reference</span><input required value={reference} onChange={(event) => setReference(event.target.value)} placeholder="Enter bank transfer reference" /></label>}
          <label className="form-field"><span>Invoice allocation</span><select required value={selectedInvoice?.id ?? ""} onChange={(event) => setInvoiceId(event.target.value)} disabled={!studentInvoices.length}><option value="" disabled>{studentId ? "No outstanding invoice" : "Select a student first"}</option>{studentInvoices.map((invoice) => {
            const alreadyAllocated = payments.filter((payment) => payment.invoiceId === invoice.id && payment.status !== "Rejected" && payment.status !== "Reversed").reduce((total, payment) => total + payment.amount, 0);
            return <option key={invoice.id} value={invoice.id}>{invoice.description} — balance {formatNaira(Math.max(0, invoice.amount - alreadyAllocated))}</option>;
          })}</select></label>
          {method === "Cash" && <label className="confirmation-field"><input type="checkbox" checked={cashConfirmed} onChange={(event) => setCashConfirmed(event.target.checked)} /><span>I confirm the physical cash has been received.</span></label>}
          {error && <p className="form-error" role="alert">{error}</p>}
          <div className="modal-actions"><button type="button" className="secondary-button" onClick={onClose}>Cancel</button><button type="submit" className="primary-button">Record payment</button></div>
        </form>
      </section>
    </div>
  );
}

function ParentsPage() {
  const [search, setSearch] = useState("");
  const parents = [
    ["Oluwatobi Adekunle", "adekunle@example.com", "2", "SPP-2024-018, SPP-2024-055", "Verified"],
    ["Ngozi Chukwu", "ngozi@example.com", "1", "SPP-2024-032", "Verified"],
    ["Ibrahim Musa", "ibrahim@example.com", "1", "SPP-2024-009", "Pending"],
  ];
  const filtered = parents.filter((row) =>
    row.join(" ").toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <>
      <div className="page-heading"><div><h2>Parents & Guardians</h2><p>Manage parent accounts and student relationships.</p></div><button className="primary-button"><UserPlus size={16} /> Add parent</button></div>
      <section className="card table-card">
        <div className="card-header students-toolbar"><label className="table-search"><Search size={16} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search parents" /></label><button className="secondary-button">All statuses <ChevronDown size={14} /></button></div>
        <div className="table-wrap"><table><thead><tr><th>Parent</th><th>Contact</th><th>Children</th><th>Student numbers</th><th>Link status</th></tr></thead><tbody>{filtered.map((row) => <tr key={row[0]}><td><strong>{row[0]}</strong></td><td>{row[1]}</td><td>{row[2]}</td><td>{row[3]}</td><td><span className={`status ${row[4].toLowerCase() === "verified" ? "verified" : "pending"}`}>{row[4]}</span></td></tr>)}</tbody></table></div>
      </section>
    </>
  );
}

function AcademicsPage() {
  const [tab, setTab] = useState("Classes");
  return (
    <>
      <div className="page-heading"><div><h2>Classes, Sessions & Terms</h2><p>Configure academic periods and class levels.</p></div><button className="primary-button"><span>+</span> Add {tab.toLowerCase().replace("sessions", "session").replace("terms", "term")}</button></div>
      <section className="card table-card">
        <div className="tab-row">{["Classes", "Sessions", "Terms"].map((item) => <button key={item} className={tab === item ? "active" : ""} onClick={() => setTab(item)}>{item}</button>)}</div>
        {tab === "Classes" && <DataTable headers={["Class", "Level", "Students", "Status"]} rows={[["JSS 1A", "Junior Secondary", "184", "Active"], ["JSS 2A", "Junior Secondary", "176", "Active"], ["SS 1B", "Senior Secondary", "203", "Active"], ["SS 2A", "Senior Secondary", "191", "Active"]]} />}
        {tab === "Sessions" && <DataTable headers={["Academic session", "Start", "End", "Status"]} rows={[["2026/2027", "Sep 2026", "Jul 2027", "Upcoming"], ["2025/2026", "Sep 2025", "Jul 2026", "Active"]]} />}
        {tab === "Terms" && <DataTable headers={["Term", "Session", "Start", "Status"]} rows={[["First Term", "2025/2026", "Sep 2025", "Completed"], ["Second Term", "2025/2026", "Jan 2026", "Completed"], ["Third Term", "2025/2026", "Apr 2026", "Active"]]} />}
      </section>
    </>
  );
}

function FeeSetupPage() {
  const [tab, setTab] = useState("Fee categories");
  return (
    <>
      <div className="page-heading"><div><h2>Fee Setup</h2><p>Manage fee categories and class structures.</p></div><button className="primary-button"><span>+</span> {tab === "Fee categories" ? "Add category" : "Create structure"}</button></div>
      <section className="card table-card">
        <div className="tab-row">{["Fee categories", "Fee structures"].map((item) => <button key={item} className={tab === item ? "active" : ""} onClick={() => setTab(item)}>{item}</button>)}</div>
        {tab === "Fee categories" ? <DataTable headers={["Category", "Description", "Status"]} rows={[["Tuition", "Core instructional fees", "Active"], ["Development levy", "School infrastructure", "Active"], ["Examination", "Term examination fees", "Active"], ["PTA levy", "Parent association support", "Active"]]} /> : <DataTable headers={["Class", "Session", "Term", "Total"]} rows={[["JSS 1A", "2025/2026", "Third Term", "₦100,000"], ["JSS 2A", "2025/2026", "Third Term", "₦105,000"], ["SS 1B", "2025/2026", "Third Term", "₦120,000"]]} />}
      </section>
    </>
  );
}

function DataTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return <div className="table-wrap"><table><thead><tr>{headers.map((header) => <th key={header}>{header}</th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row.join("-")}>{row.map((cell, index) => <td key={cell}>{index === 0 ? <strong>{cell}</strong> : cell}</td>)}</tr>)}</tbody></table></div>;
}

function StaffPage() {
  const staff = [
    ["Oluwaseun Adeyemi", "oluwaseun@grace.edu", "School Administrator", "Active"],
    ["Chinedu Okafor", "chinedu@grace.edu", "Cashier", "Active"],
    ["Aisha Bello", "aisha@grace.edu", "Cashier", "Active"],
  ];
  return (
    <>
      <div className="page-heading"><div><h2>Staff & Permissions</h2><p>Manage staff accounts and cashier access.</p></div><button className="primary-button"><UserPlus size={16} /> Invite staff</button></div>
      <section className="card table-card"><DataTable headers={["Staff member", "Email", "Role", "Status"]} rows={staff} /></section>
    </>
  );
}

function ReconciliationPage() {
  const { payments } = useSchoolData();
  const cashRecorded = payments.filter((payment) => payment.status === "Verified" && payment.method === "Cash").reduce((total, payment) => total + payment.amount, 0);
  const transferRecorded = payments.filter((payment) => payment.status === "Verified" && payment.method === "Bank transfer").reduce((total, payment) => total + payment.amount, 0);
  const pendingTransfers = payments.filter((payment) => payment.status === "Pending" && payment.method === "Bank transfer");
  const [cashCounted, setCashCounted] = useState(String(cashRecorded));
  const [bankConfirmed, setBankConfirmed] = useState(String(transferRecorded));
  const [explanation, setExplanation] = useState("");
  const [completed, setCompleted] = useState(false);
  const cashDifference = Number(cashCounted || 0) - cashRecorded;
  const bankDifference = Number(bankConfirmed || 0) - transferRecorded;

  return (
    <>
      <div className="page-heading"><div><h2>Daily Reconciliation</h2><p>Compare verified collections with physical cash and confirmed bank credits.</p></div></div>
      <section className="stats-grid">
        <StatCard label="Recorded cash" value={formatNaira(cashRecorded)} change="Verified cash receipts" icon={Banknote} tone="green" />
        <StatCard label="Recorded transfers" value={formatNaira(transferRecorded)} change="Verified bank credits" icon={Landmark} tone="blue" />
        <StatCard label="Discrepancy" value={formatNaira(Math.abs(cashDifference) + Math.abs(bankDifference))} change={cashDifference === 0 && bankDifference === 0 ? "No difference" : "Explanation required"} icon={ShieldCheck} tone="purple" />
        <StatCard label="Pending review" value={String(pendingTransfers.length)} change="Unverified transfers" icon={FileText} tone="orange" />
      </section>
      <section className="card settings-card reconciliation-card">
        <h3>Collection count</h3>
        <div className="form-grid">
          <label className="form-field"><span>Physical cash counted (₦)</span><input type="number" min="0" step="0.01" value={cashCounted} onChange={(event) => { setCashCounted(event.target.value); setCompleted(false); }} /></label>
          <label className="form-field"><span>Bank credits confirmed (₦)</span><input type="number" min="0" step="0.01" value={bankConfirmed} onChange={(event) => { setBankConfirmed(event.target.value); setCompleted(false); }} /></label>
        </div>
        {(cashDifference !== 0 || bankDifference !== 0) && <label className="form-field"><span>Discrepancy explanation</span><input value={explanation} onChange={(event) => setExplanation(event.target.value)} placeholder="Explain the difference before completing" /></label>}
        <div className="modal-actions"><span className="inline-notice">{completed ? "Reconciliation completed locally for this demo." : "Pending transfers are excluded until bank credit is confirmed."}</span><button className="primary-button" disabled={(cashDifference !== 0 || bankDifference !== 0) && !explanation.trim()} onClick={() => setCompleted(true)}>Complete reconciliation</button></div>
      </section>
      {pendingTransfers.length > 0 && <section className="card table-card reconciliation-pending">
        <div className="card-header"><div><h3>Pending bank transfers</h3><p>Verify actual bank credit from the Payments page.</p></div><NavLink className="text-button" to="/payments">Review payments <ChevronRight size={15} /></NavLink></div>
        <div className="table-wrap"><table><thead><tr><th>Reference</th><th>Date</th><th>Amount</th><th>Status</th></tr></thead><tbody>{pendingTransfers.map((payment) => <tr key={payment.id}><td>{payment.reference || "—"}</td><td>{payment.date}</td><td>{formatNaira(payment.amount)}</td><td><span className="status pending">Pending</span></td></tr>)}</tbody></table></div>
      </section>}
    </>
  );
}

function SchoolSettingsPage() {
  const { settings, updateSettings } = useSchoolData();
  const [form, setForm] = useState<SchoolSettings>(settings);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  function update<K extends keyof SchoolSettings>(key: K, value: SchoolSettings[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    setSaved(false);
  }

  function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const receiptPrefix = form.receiptPrefix.trim().replace(/[^a-zA-Z0-9-]/g, "").toUpperCase();
    if (!form.schoolName.trim() || !receiptPrefix) {
      setError("Enter a school name and a receipt prefix containing letters, numbers, or hyphens.");
      return;
    }
    const nextSettings = { ...form, schoolName: form.schoolName.trim(), receiptPrefix };
    updateSettings(nextSettings);
    setForm(nextSettings);
    setError("");
    setSaved(true);
  }

  return (
    <form onSubmit={save}>
      <div className="page-heading"><div><h2>School Settings</h2><p>Manage school profile, receipt details and preferences.</p>{saved && <p className="inline-notice" role="status">Settings saved in this browser.</p>}</div><button className="primary-button" type="submit">Save changes</button></div>
      {error && <p className="form-error" role="alert">{error}</p>}
      <section className="settings-grid">
        <article className="card settings-card"><h3>School profile</h3><label className="form-field"><span>School name</span><input required value={form.schoolName} onChange={(event) => update("schoolName", event.target.value)} /></label><label className="form-field"><span>School address</span><input value={form.schoolAddress} onChange={(event) => update("schoolAddress", event.target.value)} /></label><label className="form-field"><span>Contact email</span><input type="email" value={form.contactEmail} onChange={(event) => update("contactEmail", event.target.value)} /></label></article>
        <article className="card settings-card"><h3>Receipt preferences</h3><label className="form-field"><span>Receipt prefix</span><input required maxLength={12} value={form.receiptPrefix} onChange={(event) => update("receiptPrefix", event.target.value)} /></label><label className="form-field"><span>Support phone</span><input value={form.supportPhone} onChange={(event) => update("supportPhone", event.target.value)} /></label><label className="form-field"><span>Current academic term</span><select value={form.academicTerm} onChange={(event) => update("academicTerm", event.target.value)}><option>First Term</option><option>Second Term</option><option>Third Term</option></select></label></article>
      </section>
    </form>
  );
}

function AuthPage({ mode }: { mode: "login" | "register" | "forgot" }) {
  const [submitted, setSubmitted] = useState(false);
  const copy = mode === "register" ? ["Register your school", "Create a new Grace College workspace"] : mode === "forgot" ? ["Reset your password", "Enter your account email"] : ["Welcome back", "Sign in to your School PayPoint account"];
  return (
    <div className="auth-page"><div className="auth-brand"><div className="brand-mark"><GraduationCap size={23} /></div><strong>School PayPoint</strong></div><section className="auth-card">
      {submitted ? <><div className="success-icon"><ShieldCheck size={26} /></div><h1>{mode === "forgot" ? "Check your email" : mode === "register" ? "Application submitted" : "Signed in"}</h1><p>{mode === "forgot" ? "Password reset instructions have been sent." : mode === "register" ? "Your school application is pending platform approval." : "Your account is verified."}</p><a className="primary-button" href="/login">Continue</a></> : <><h1>{copy[0]}</h1><p>{copy[1]}</p><form onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}>
      {mode === "register" && <><label className="form-field"><span>School name</span><input required placeholder="School name" /></label><label className="form-field"><span>School address</span><input required placeholder="School address" /></label><label className="form-field"><span>Administrator name</span><input required placeholder="Full name" /></label></>}
      <label className="form-field"><span>Email address</span><input required type="email" placeholder="name@school.edu" /></label>
      {mode !== "forgot" && <label className="form-field"><span>Password</span><input required type="password" placeholder="Enter password" /></label>}
      <button className="primary-button auth-submit" type="submit">{mode === "register" ? "Submit application" : mode === "forgot" ? "Send reset link" : "Sign in"}</button>
      </form><div className="auth-links">{mode === "login" ? <><a href="/forgot-password">Forgot password?</a><a href="/register">Register a school</a></> : <a href="/login">Back to login</a>}</div></>}
    </section></div>
  );
}

function ReceiptVerificationPage() {
  const { code: routeCode } = useParams();
  const { students, payments, settings } = useSchoolData();
  const [code, setCode] = useState(routeCode ?? "");
  const [checkedCode, setCheckedCode] = useState("");
  const receiptPayment = payments.find((payment) =>
    payment.status === "Verified"
    && receiptNumber(payment.id, settings.receiptPrefix).toLowerCase() === checkedCode.trim().toLowerCase(),
  );
  const student = receiptPayment ? students.find((item) => item.id === receiptPayment.studentId) : undefined;

  return (
    <div className="verify-page"><section className="auth-card verify-card"><div className="brand"><div className="brand-mark"><GraduationCap size={20} /></div><strong>School PayPoint</strong></div><h1>Verify a receipt</h1><p>Enter the receipt verification code printed on the receipt.</p><label className="form-field"><span>Receipt code</span><input value={code} onChange={(event) => setCode(event.target.value)} placeholder={`${settings.receiptPrefix}-000001`} /></label><button className="primary-button auth-submit" onClick={() => setCheckedCode(code)}>Verify receipt</button>{checkedCode && (receiptPayment && student ? <div className="verification-result"><ShieldCheck size={23} /><div><strong>Valid receipt</strong><span>{settings.schoolName} · {receiptPayment.date} · {formatNaira(receiptPayment.amount)} · Student {student.admission.slice(-4).padStart(student.admission.length, "•")}</span></div></div> : <p className="form-error" role="alert">No verified receipt was found for that code.</p>)}</section></div>
  );
}

function RoleWorkspace({ mode }: { mode: "cashier" | "parent" | "platform" }) {
  const [paymentOpen, setPaymentOpen] = useState(false);
  const { students, invoices, payments, settings } = useSchoolData();
  const [paymentMethod, setPaymentMethod] = useState<"Cash" | "Bank transfer">("Cash");

  if (mode === "cashier") {
    const verifiedPayments = payments.filter((payment) => payment.status === "Verified");
    const collected = verifiedPayments.reduce((total, payment) => total + payment.amount, 0);
    const pendingTransfers = payments.filter((payment) => payment.method === "Bank transfer" && payment.status === "Pending").length;
    return <div className="standalone-shell">
      <div className="standalone-header"><div className="brand-mark"><GraduationCap size={20} /></div><strong>Cashier workspace</strong><button className="primary-button" onClick={() => { setPaymentMethod("Cash"); setPaymentOpen(true); }}>Record payment</button></div>
      <main className="standalone-main">
        <div className="page-heading"><div><h2>Good morning, Chinedu</h2><p>Payment activity across this demo workspace</p></div></div>
        <section className="stats-grid">
          <StatCard label="Verified collections" value={formatNaira(collected)} change="Verified payments" icon={Banknote} tone="green" />
          <StatCard label="Receipts issued" value={String(verifiedPayments.length)} change="Verified payments" icon={BadgeDollarSign} tone="blue" />
          <StatCard label="Transfers pending" value={String(pendingTransfers)} change="Need bank confirmation" icon={Landmark} tone="orange" />
          <StatCard label="Students served" value={String(new Set(verifiedPayments.map((payment) => payment.studentId)).size)} change="With a verified payment" icon={Users} tone="purple" />
        </section>
        <PaymentsPage onRecordPayment={(method) => { setPaymentMethod(method ?? "Cash"); setPaymentOpen(true); }} />
      </main>
      {paymentOpen && <PaymentModal initialMethod={paymentMethod} onClose={() => setPaymentOpen(false)} />}
    </div>;
  }
  if (mode === "parent") {
    const linkedStudents = students.filter((student) => ["SPP-2024-018", "SPP-2024-055"].includes(student.admission));
    return <div className="parent-shell">
      <header><div className="brand"><div className="brand-mark"><GraduationCap size={20} /></div><strong>{settings.schoolName}</strong></div><UserRound size={20} /></header>
      <main>
        <div className="page-heading"><div><h2>My children</h2><p>Fee statements and verified payment history</p></div></div>
        <section className="parent-children">{linkedStudents.map((student) => {
          const studentInvoices = invoices.filter((invoice) => invoice.studentId === student.id);
          const balance = studentInvoices.reduce((total, invoice) => total + Math.max(0, invoice.amount - invoicePaid(invoice.id, payments)), 0);
          return <article className="card child-card" key={student.id}>
            <div className="student-avatar">{student.name.split(" ").map((part) => part[0]).join("")}</div>
            <div><strong>{student.name}</strong><span>{student.className} · {student.admission}</span>
              <div className="parent-statement">{studentInvoices.map((invoice) => <span key={invoice.id}>{invoice.description}: {formatNaira(Math.max(0, invoice.amount - invoicePaid(invoice.id, payments)))}</span>)}</div>
            </div>
            <b>{formatNaira(balance)} due</b>
          </article>;
        })}</section>
      </main>
    </div>;
  }
  return <div className="standalone-shell"><div className="standalone-header"><div className="brand-mark"><Building2 size={20} /></div><strong>Platform Administration</strong></div><main className="standalone-main"><div className="page-heading"><div><h2>Platform overview</h2><p>School registrations and platform activity</p></div></div><section className="stats-grid"><StatCard label="Registered schools" value="24" change="All time" icon={Building2} tone="blue" /><StatCard label="Pending applications" value="3" change="Need review" icon={FileText} tone="orange" /><StatCard label="Active schools" value="21" change="Live workspaces" icon={ShieldCheck} tone="green" /><StatCard label="Suspended schools" value="0" change="Current" icon={LockKeyhole} tone="purple" /></section><section className="card table-card"><div className="card-header"><div><h3>School applications</h3><p>New registration requests</p></div></div><DataTable headers={["School", "Administrator", "Submitted", "Status", "Action"]} rows={[["Lagos Scholars Academy", "Tunde Bakare", "Nov 18, 2026", "Pending", "Review"], ["Bright Future College", "Mary Johnson", "Nov 17, 2026", "Pending", "Review"], ["Covenant Heights", "Samuel Okoro", "Nov 15, 2026", "Pending", "Review"]]} /></section></main></div>;
}

function PlaceholderPage({ title }: { title: string }) {
  return (
    <>
      <div className="page-heading">
        <div><h2>{title}</h2><p>Manage {title.toLowerCase()} for Grace College.</p></div>
      </div>
      <section className="card empty-page">
        <div className="empty-icon"><FileText size={26} /></div>
        <h3>{title} workspace</h3>
        <p>This frontend module is ready to connect to the School PayPoint API.</p>
        <button className="primary-button">Create new</button>
      </section>
    </>
  );
}

export default App;
