School PayPoint — Technical Specification
Version: 1.0
Status: Initial MVP implementation specification
Product: School PayPoint
Market: Secondary schools in Nigeria
Currency: Nigerian Naira (₦)
Platform: Responsive web application
1. Product Summary
School PayPoint is a multi-school SaaS platform for managing secondary-school fees and financial records. Each school operates in its own protected workspace while a platform Super Administrator manages school registration and platform-level operations.

The MVP includes school registration and approval, authentication and role permissions, student and parent records, classes and academic periods, fee structures and invoices, cash and bank-transfer payment recording, transfer verification, installment payments, receipts, parent access, financial reports, reconciliation and audit logs.

Parents pay schools outside the application by cash or bank transfer. The application records and manages those payments; it does not process online payments in the MVP. An internet connection is required to use the application.
2. Product Goals
1. Replace fragmented paper-based payment records with reliable digital records.
2. Make it easy for staff to know what each student owes and has paid.
3. Give parents visibility into their children's fee statements and receipts.
4. Improve accountability through cashier-level records and audit logs.
5. Protect each school's information from access by other schools.
6. Establish a modular foundation for future mobile apps and school-management modules.
2.1 Out of Scope for MVP
Do not implement online payment gateways, attendance, examinations, results, teacher payroll, timetables, library, transport, inventory, full mobile applications or student login accounts in the first release. Keep the architecture extensible without allowing future modules to delay the payment-focused MVP.
3. Confirmed Product Decisions
Area	Decision
Product model	Multi-school SaaS
Target market	Nigerian secondary schools
First platform	Responsive web application
Connectivity	Internet required
MVP payment methods	Cash and bank transfer
Payment processing	Payment happens outside the app; staff record it in the app
Transfer verification	Confirm actual bank credit; screenshots alone are insufficient
Parent access	Read-only access to linked children's financial records
Student access	Student records only; no student login in MVP
Receipt signature	Cashier prints and physically signs the receipt
Receipt verification	QR code with limited public information
Currency	Nigerian Naira (₦)
Future mobile	React Native/Expo using the same backend services


4. Users, Roles and Permissions
4.1 Super Administrator
- View platform summary and school registration statistics.
- Review, approve or reject school applications.
- Activate or suspend a school.
- View school account details and platform activity.
- Manage platform-level settings.
Super Administrator access to private student payment data must be restricted to an explicitly authorized and audited support process.
4.2 School Administrator
- Manage school profile and settings.
- Manage staff and cashier accounts.
- Manage classes, academic sessions and terms.
- Register and update students and parents.
- Configure fee categories and fee structures.
- Create and manage student invoices.
- View payments, receipts and financial reports.
- Approve sensitive financial corrections and reversals.
4.3 Cashier/Bursar
- Search students and view balances.
- Record cash and bank-transfer payments.
- Verify transfers when granted that permission.
- Allocate payments to invoices.
- Generate and print receipts for verified payments.
- View permitted payment and collection history.
- Complete daily cash reconciliation.
Sensitive actions such as reversals, receipt cancellation and permission changes require separately authorized approval.
4.4 Parent/Guardian
- View only children linked to their account.
- View fee statements and outstanding balances.
- View verified payment history.
- View and download issued receipts.
- Manage their own account details.
Parents cannot create or edit payments, change invoices, verify transfers or modify school financial records.
4.5 Permission Enforcement
- Enforce permissions in the backend and database, not only by hiding frontend navigation.
- Every school-scoped request must validate the authenticated user's school membership.
- Parent access must be checked against the parent-to-student relationship for every requested child record.
5. User Interface and Design Specification
5.1 Design Direction
Use a clean, trustworthy, modern financial-administration interface. It should feel simple for busy school administrators and cashiers who may not be technical.

Design principles:
- Clear information hierarchy.
- Calm, professional visual styling.
- Consistent spacing and typography.
- Readable tables and financial figures.
- Clear distinction between primary and secondary actions.
- Readable status labels for pending, verified, rejected and reversed records.
- Responsive desktop, tablet and mobile-browser layouts.
- Accessible form labels, focus states and adequate contrast.
5.2 Visual System
Use the approved School PayPoint UI direction as the baseline. Centralize colours, typography, spacing and component styles in design tokens.

Suggested starting palette, subject to the approved UI reference:
- Primary: deep navy/blue for trust and navigation.
- Accent: teal or blue for primary actions and positive emphasis.
- Page background: very light neutral grey.
- Surface: white cards and panels.
- Text: dark slate, with muted slate for supporting text.
- Borders: subtle cool grey.
- Status: green for verified/success, amber for pending, red for rejected/reversed, grey for inactive.
Never use colour alone to communicate status; pair it with a readable label and, where useful, an icon.
5.3 Application Shell
Authenticated school workspaces should use:
- Persistent left sidebar on desktop.
- Collapsible/mobile navigation on smaller screens.
- Top bar with page title, school context, notifications and user menu.
- Main content area with consistent spacing.
- Breadcrumbs on deeper management pages.
- Reusable page headers with title, description and primary action.
The Super Administrator workspace has a platform-level shell. School Administrator and Cashier views use the selected school's workspace. Parent pages use a simplified, mobile-friendly shell.
5.4 Dashboard Requirements
School Administrator dashboard
- Summary cards: total students, fees billed, amount collected and outstanding balance.
- Collection trend for the selected period.
- Recent payments.
- Outstanding-fee overview.
- Quick links to students, fee setup, payments and reports.
Cashier dashboard
- Today's collection amount.
- Receipts issued today.
- Transfers awaiting verification.
- Students served today.
- Quick actions: Record cash, Record transfer, Issue receipt, Find student.
- Recent transactions and daily collection summary.
The earlier UI concept used illustrative figures such as ₦450,000 collected today, 32 receipts, 5 pending transfers and 18 students served. These are placeholders only and must be replaced by live database values before production.

Parent dashboard
- Linked children.
- Outstanding balance per child.
- Recent verified payments.
- Recent receipts.
- Clear links to each child's statement.
Super Administrator dashboard
- Registered schools.
- Pending school applications.
- Active and suspended schools.
- Recent platform activity.
5.5 Required Screens
Public: Landing page, about/product information, school registration, login, forgot/reset password, public receipt verification.

Super Administrator: Overview, school applications, school directory and details, school status management, platform users, platform activity, settings.

School Administrator: Overview, students and student profile, parents and parent profile, classes, academic sessions and terms, fee categories, fee structures, student invoices, payments and payment details, receipts, staff management, financial reports, daily reconciliation, school settings.

Cashier: Overview, student search, student payment statement, record cash payment, record bank transfer, transfer verification queue, verified payments, receipt preview and printing, receipt history, daily collection and reconciliation.

Parent: Overview, my children, child fee statement, payment history, receipt viewer/download, notifications, profile and account settings.
5.6 Reusable UI Components
Build reusable components:
- AppShell, Sidebar, Topbar, MobileNav
- PageHeader, Breadcrumbs
- StatCard, ChartCard
- DataTable, TableToolbar, Pagination
- SearchInput, FilterBar
- FormField, SelectField, DateField, CurrencyInput
- StatusBadge, EmptyState, LoadingState, ErrorState
- ConfirmDialog, Toast
- StudentLookup, PaymentSummary
- ReceiptPreview, PrintReceiptLayout
5.7 Interaction Rules
- Every form must show field-level validation and a useful submission result.
- Sensitive or destructive actions require confirmation.
- Show loading, empty, success and error states.
- Paginate long tables.
- Prevent duplicate submissions while a request is processing.
- Format currency consistently as Naira.
- Make tables usable on mobile through responsive rows or horizontal scrolling.
- Do not use fake dashboard figures in production.
6. Functional Requirements
FR-01: School Registration and Approval
- A school submits name, address, email, phone, logo and administrator details.
- New applications start as pending.
- Super Administrator can approve, reject or suspend an application.
- An approved school receives an isolated workspace.
- Every school-owned record is associated with a school identifier.
FR-02: Authentication and Accounts
- Login, logout and password reset.
- Account activation/deactivation.
- Role and school-membership management.
- Protected routes and API endpoints.
- Secure session handling.
- Staff invitation/provisioning through an authorized workflow.
FR-03: Student Records
Fields: full name, admission number, gender if required by the school, class, academic session, parent/guardian relationship, appropriate contact details and status (active, graduated, withdrawn).

Requirements:
- Admission number is unique within a school.
- Search by name or admission number.
- View profile and financial statement.
- Preserve historical payment and invoice records.
- Archive rather than hard-delete students with financial history.
FR-04: Parent Records
- Create and maintain parent profiles.
- Link one parent to multiple students.
- Support multiple guardians where school policy requires it.
- Limit parent portal access to linked children.
- Require school-approved verification before linking a parent to a student.
FR-05: Classes, Sessions and Terms
- Create school classes/levels.
- Create academic sessions.
- Create terms within sessions.
- Associate students and fee structures with the correct academic period.
- Preserve historical relationships for reporting.
FR-06: Fee Management and Invoices
- Create fee categories.
- Define fee structures by class, session and term.
- Support authorized student-specific charges, discounts and waivers.
- Generate invoices for students.
- Preserve the amount and description applied to an invoice if the fee structure changes later.
- Display billed amount, amount paid and balance.
FR-07: Payments
Supported methods: cash and bank_transfer.

Payment data includes school, student, invoice allocation, amount received, method, payment date, recorded timestamp, transfer reference where applicable, recording cashier, verification status and verifier.

Rules:
- Cash is verified only after the cashier confirms physical receipt.
- Bank transfer is verified only after checking actual credit to the school's bank account.
- A screenshot or customer-provided notification is not sufficient proof of credit.
- Support partial payments and installments.
- Prevent duplicate transfer references within the relevant school/account context where feasible.
- Do not allow allocations to exceed payment amount or invoice balance.
- Reversals require authorization, a reason and an audit trail.
- Never silently delete a payment.
Suggested statuses: pending, verified, rejected, reversed.

Only verified payments affect paid balances and qualify for official receipt issuance.
FR-08: Receipt Management
Receipt fields:
- School name, logo and contact details.
- Unique receipt number.
- Student name, admission number and class.
- Academic session and term.
- Payment description.
- Amount received.
- Payment method and transfer reference where applicable.
- Payment date and cashier name.
- Physical signature line and school stamp area.
- QR verification code.
Rules:
- Generate receipts only for verified payments.
- Receipt numbers are unique within a school.
- Cashier prints and physically signs the receipt.
- Reprints are visibly marked COPY.
- Cancellation requires permission and a reason.
- Preserve receipt and audit history.
- QR verification exposes limited public information only.
Public QR verification may show receipt number, school name, payment date, amount, masked admission number and validity status. It must not expose full student names, parent contacts, bank details or other private records.
FR-09: Parent Portal
- Show linked children.
- Show current and historical fee statements.
- Show outstanding balances.
- Show verified payments.
- Allow receipt viewing and downloading.
- Provide school announcements/notifications where enabled.
- Keep all financial actions read-only.
FR-10: Reports and Reconciliation
Reports:
- Daily, weekly, monthly and termly collections.
- Outstanding balances.
- Cash collections.
- Bank-transfer collections.
- Collections by cashier.
- Reversals and adjustments.
Reconciliation:
- Compare recorded cash payments against physical cash counted.
- Compare recorded bank transfers against confirmed bank credits.
- Record discrepancies and explanations.
- Restrict completion to authorized staff.
Exports: PDF and CSV.
FR-11: Audit Logs
Record login events where appropriate, school approval/status changes, student and parent changes, fee and invoice changes, payment creation and verification, receipt generation/reprint/cancellation, reversals, role changes and reconciliation events.

Each event includes actor, school context, action, target record, timestamp and relevant non-sensitive metadata. Never log passwords, access tokens or full bank credentials.
7. Payment and Receipt Workflows
7.1 Cash Workflow
1. Parent presents payment at school.
2. Cashier searches for the student.
3. System displays invoices and balances.
4. Cashier selects invoice allocation and enters amount.
5. Cashier confirms cash has physically been received.
6. Backend validates and records payment.
7. Invoice balance is recalculated transactionally.
8. Receipt is generated for the verified payment.
9. Cashier prints and physically signs the receipt.
10. Parent receives the signed receipt.
7.2 Bank Transfer Workflow
1. Parent transfers money to the school's bank account outside the app.
2. Parent provides the transfer reference.
3. Cashier checks the actual bank account credit.
4. Authorized cashier records and verifies the transfer.
5. Backend validates reference and allocation.
6. Invoice balance is recalculated transactionally.
7. Receipt is generated and printed.
8. Cashier physically signs the receipt.
7.3 Partial Payment
- A payment may cover part of an invoice.
- Outstanding balance equals invoice total minus verified allocations, adjusted for approved discounts/waivers and reversals.
- A partially paid invoice remains partially_paid.
- An invoice becomes paid only when its remaining balance is zero.
- Use database-safe decimal values and transactional logic.
7.4 Reversal
- Only authorized users can request or approve a reversal.
- Require a reason and reference to the original payment.
- Do not delete the original transaction.
- Record the reversal as a separate immutable financial event.
- Recalculate affected balances transactionally.
- Preserve receipt validity/cancellation history and audit events.
8. Data Model
Use PostgreSQL through Supabase. All school-owned records must carry school_id or be reachable through a verified school-owned relationship.
Table	Purpose
schools	School profile, status and settings
profiles	User profile linked to Supabase Auth
school_members	User-to-school membership and role
students	Student records
parents	Parent/guardian records
parent_students	Parent-to-student relationship
classes	School class/level records
academic_sessions	Academic sessions
terms	Terms within a session
fee_categories	Fee types
fee_structures	Amounts assigned by class/session/term
student_invoices	Student-specific billed amounts
invoice_items	Itemized charges
payments	Payment transaction records
payment_allocations	Payment-to-invoice allocations
bank_transfer_evidence	Private evidence/reference metadata
receipts	Issued receipts and verification code
receipt_reprints	Reprint history
payment_reversals	Authorized reversal events
reconciliations	Daily collection reconciliation
reconciliation_items	Reconciliation breakdown/discrepancies
audit_logs	Activity history
notifications	In-app notifications


8.1 Database Rules
- Use UUID primary keys.
- Use NUMERIC(12,2) or another suitable decimal type for Naira; never floating-point columns for money.
- Use TIMESTAMPTZ for timestamps.
- Index school, student, admission number, receipt number, status and date-filter columns.
- Enforce school-scoped uniqueness, such as (school_id, admission_number) and (school_id, receipt_number).
- Use foreign keys and database constraints.
- Use transactions for payment creation, allocation, balance updates and reversals.
- Preserve historical fee and invoice snapshots.
- Archive rather than delete records referenced by financial transactions.
8.2 Tenant Isolation and RLS
- Enable Row Level Security on all tables exposed through Supabase.
- Policies verify authenticated user school membership and role.
- Parent policies verify the parent-to-student link.
- Super Administrator access uses a carefully controlled platform role.
- Never trust a client-supplied school_id without server-side membership validation.
- Never expose the Supabase service-role key in browser code.
- Test cross-school access explicitly.
9. Technical Architecture
9.1 Recommended Stack
Frontend: React, Vite, TypeScript, Tailwind CSS, React Router, TanStack Query, React Hook Form, Zod, Lucide React.

Backend: Node.js, Express, TypeScript, REST API.

Platform services: Supabase PostgreSQL, Supabase Auth, Supabase Storage and PostgreSQL RLS.

Utilities: PDF generation, QR code generation, CSV export and automated tests.

Deployment: Vercel for frontend, Render or another Node-compatible host for API, Supabase for database/auth/storage.

The frontend calls the backend for sensitive financial operations. The backend validates identity, role, school membership and business rules before writing financial data.
9.2 Request Flow
1. User signs in through Supabase Auth.
2. Frontend receives the authenticated session.
3. Frontend calls the School PayPoint API with the access token.
4. API validates the token and loads profile and school membership.
5. API checks role permissions and tenant access.
6. API performs business operations using secure server-side credentials or an appropriately scoped database access strategy.
7. Database constraints, transactions and RLS provide additional protection.
8. API returns only authorized data.
9.3 Suggested Monorepo Structure
school-paypoint/
├── apps/
│   ├── web/
│   │   ├── src/
│   │   │   ├── app/
│   │   │   ├── assets/
│   │   │   ├── components/
│   │   │   ├── features/
│   │   │   │   ├── auth/
│   │   │   │   ├── schools/
│   │   │   │   ├── students/
│   │   │   │   ├── parents/
│   │   │   │   ├── fees/
│   │   │   │   ├── invoices/
│   │   │   │   ├── payments/
│   │   │   │   ├── receipts/
│   │   │   │   ├── reports/
│   │   │   │   └── reconciliation/
│   │   │   ├── layouts/
│   │   │   ├── pages/
│   │   │   ├── routes/
│   │   │   ├── services/
│   │   │   ├── styles/
│   │   │   ├── types/
│   │   │   └── utils/
│   │   └── package.json
│   └── api/
│       ├── src/
│       │   ├── config/
│       │   ├── middleware/
│       │   ├── modules/
│       │   ├── services/
│       │   ├── utils/
│       │   └── server.ts
│       └── package.json
├── packages/
│   ├── shared-types/
│   └── validation/
├── database/
│   ├── migrations/
│   ├── seeds/
│   └── policies/
├── docs/
│   ├── PRD.md
│   └── spec.md
├── .env.example
├── package.json
└── README.md
10. API Specification
Use versioned REST routes under /api/v1.
Method	Endpoint	Purpose
POST	/api/v1/schools/register	Submit school registration
GET	/api/v1/schools	List schools for authorized platform admin
PATCH	/api/v1/schools/:id/status	Approve/reject/suspend school
GET	/api/v1/students	Search/list authorized students
POST	/api/v1/students	Create student
GET	/api/v1/students/:id	Get student profile
GET	/api/v1/students/:id/statement	Get student fee statement
POST	/api/v1/fees	Create fee structure
POST	/api/v1/invoices	Create invoice
GET	/api/v1/invoices/:id	Get invoice
POST	/api/v1/payments	Record payment
POST	/api/v1/payments/:id/verify	Verify eligible payment
POST	/api/v1/payments/:id/reverse	Request/execute authorized reversal
GET	/api/v1/payments	List authorized payments
POST	/api/v1/receipts	Issue receipt for verified payment
GET	/api/v1/receipts/:id	Get receipt
POST	/api/v1/receipts/:id/reprint	Record a reprint
GET	/api/v1/receipts/verify/:code	Public limited receipt verification
GET	/api/v1/reports/collections	Collection report
POST	/api/v1/reconciliations	Submit daily reconciliation


All endpoints validate authentication, authorization, input schema and tenant scope. Sensitive mutations should be idempotent where appropriate and return clear validation errors.
11. Validation and Financial Integrity
- Validate request bodies with shared Zod schemas or equivalent.
- Normalize and validate admission numbers and transfer references.
- Reject negative or zero payment amounts unless an explicit adjustment workflow permits them.
- Ensure allocations do not exceed payment amount or invoice balance.
- Use idempotency keys or duplicate-submission protection for payment creation.
- Generate receipt numbers on the server/database, not in the browser.
- Calculate balances on the server/database; never trust frontend totals.
- Record who performed each financial action and when.
- Do not issue receipts for pending, rejected or reversed payments.
12. Security and Privacy
- Enforce authentication and role-based authorization.
- Enforce school-level tenant isolation using backend checks and RLS.
- Keep service-role secrets on the server only.
- Store transfer evidence and school logos in appropriately permissioned storage.
- Limit public QR verification data.
- Apply rate limits to login, password reset and public verification endpoints.
- Validate and sanitize user input.
- Use HTTPS in production.
- Keep secrets in environment variables.
- Maintain database backups and a tested recovery process.
- Avoid storing unnecessary personal information.
- Never log passwords, access tokens or bank login credentials.
13. Non-Functional Requirements
Performance
- Paginate large lists.
- Index frequently filtered and joined columns.
- Use server-side filtering for reports.
- Avoid loading entire student or transaction histories at once.
Reliability
- Use transactions for financial operations.
- Prevent duplicate submissions.
- Preserve financial history.
- Provide safe error handling and operational logs.
Accessibility and usability
- Responsive desktop, tablet and mobile-browser layouts.
- Keyboard-accessible navigation and forms.
- Visible focus states.
- Clear field labels and validation.
- Status text must accompany status colours.
Maintainability
- Feature-based frontend modules.
- Modular backend services.
- Shared types and validation schemas where practical.
- Database migrations committed to version control.
- Environment-specific configuration.
- Automated tests for critical financial logic and tenant permissions.
14. Testing Strategy
Unit tests
- Fee calculations.
- Installment allocation.
- Outstanding balance calculation.
- Receipt number uniqueness rules.
- Permission checks.
- Input validation.
Integration tests
- School registration and approval.
- Student creation.
- Fee structure and invoice creation.
- Cash payment recording.
- Bank transfer verification.
- Receipt generation and reprint.
- Payment reversal.
- Parent-child access.
Security tests
- School A cannot access School B records.
- Parent cannot access an unlinked student.
- Cashier cannot access another school's data.
- Parent cannot mutate financial records.
- Unauthorized users cannot verify, reverse or cancel transactions.
- Public receipt verification reveals only permitted fields.
User acceptance tests
- School administrator configures a term's fees.
- Cashier records a payment and prints a receipt.
- Parent views a linked child's statement.
- Administrator reviews collection and outstanding reports.
- Staff complete and review daily reconciliation.
15. MVP Delivery Plan
Stage 1 — Project Foundation and UI
- Create repository and workspace structure.
- Configure React, Vite, TypeScript and Tailwind.
- Set up routing, design tokens and reusable components.
- Build responsive public pages and application shells.
- Implement dashboard layouts using clearly labelled sample data.
Stage 2 — Authentication and School Isolation
- Configure Supabase.
- Implement profiles and school memberships.
- Implement login and protected routes.
- Implement school registration and approval.
- Add RLS policies and tenant-isolation tests.
Stage 3 — School Records
- Classes, sessions and terms.
- Student records.
- Parent records and relationships.
- Search, filters and profile screens.
Stage 4 — Fees and Invoices
- Fee categories.
- Fee structures.
- Student invoices.
- Authorized discounts/waivers.
- Statement and balance views.
Stage 5 — Payments
- Cash payment recording.
- Bank transfer recording and verification.
- Payment allocations.
- Installments.
- Reversals and audit trail.
Stage 6 — Receipts
- Unique receipt numbers.
- Printable receipt layout.
- Physical signature and stamp areas.
- QR verification.
- Reprint and cancellation history.
Stage 7 — Parent Portal and Reports
- Parent dashboard.
- Statements and receipts.
- Collection and outstanding reports.
- CSV/PDF exports.
- Daily reconciliation.
Stage 8 — Hardening and Launch
- End-to-end tests.
- Security and tenant-isolation review.
- Production deployment.
- Backups and monitoring.
- Pilot with a small number of schools.
- Fix issues before wider onboarding.
16. Definition of Done
A feature is complete only when:
1. Its UI works on desktop and mobile browser sizes.
2. Form validation and error states are implemented.
3. Its API enforces authentication and permissions.
4. Database access respects school isolation.
5. Loading, empty and success states are present.
6. Critical business logic has automated tests.
7. Financial changes are auditable.
8. It has been reviewed against acceptance criteria.
The MVP is ready for pilot use when the PRD acceptance criteria are met, financial calculations are tested and cross-school access tests pass.
17. Implementation Guardrails
- Build on this specification and the approved PRD; do not expand MVP scope without an explicit product decision.
- Keep the payment-focused MVP small and reliable.
- Do not fabricate payment confirmations or bank verification.
- Do not use frontend-only authorization for sensitive data.
- Do not expose Supabase service-role credentials.
- Do not hard-delete financial records.
- Do not issue receipts for unverified payments.
- Treat sample dashboard figures as placeholders.
- Keep future modules out of MVP navigation unless clearly marked as future functionality.