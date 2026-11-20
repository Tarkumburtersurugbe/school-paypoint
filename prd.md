PRODUCT REQUIREMENTS DOCUMENT
SCHOOL PAYPOINT
Multi-School Payment Management Platform
for Secondary Schools
Document Type: Product Requirements Document (PRD)
Product Name: School PayPoint
Product Category: Education Technology / Financial Management
Target Market: Secondary Schools in Nigeria
Currency: Nigerian Naira (₦)
Version: 1.0
Status: Initial MVP Specification
Prepared as the initial product specification for the School PayPoint MVP.1. PROJECT OVERVIEW
1.1 Introduction
School PayPoint is a multi-school payment management platform designed to help secondary schools
manage school fees, record financial transactions, generate official payment receipts and monitor
outstanding payments.
The platform will provide a centralized digital system where school administrators, cashiers, bursars and
parents can manage school payment activities efficiently.
The system will replace manual payment records and improve financial accountability, transparency and
record keeping within secondary schools.
School PayPoint will initially focus on financial management and payment operations, with the ability to
expand into a complete school management system in the future.
1.2 Product Vision
To become a reliable digital payment management platform that helps secondary schools across Nigeria
manage financial activities efficiently, securely and transparently.
1.3 Product Objectives
1. Digitize school fee management.
2. Reduce manual financial record keeping.
3. Make payment tracking easier.
4. Provide accurate financial reports.
5. Generate official school payment receipts.
6. Improve accountability among school cashiers and bursars.
7. Allow parents to monitor their children's payment records.
8. Support multiple schools on one platform.
2. PROBLEM STATEMENT
Many secondary schools still depend on manual processes to manage school fees and financial
transactions.
• Difficulty tracking students who have paid their fees.
• Loss or duplication of payment receipts.
• Errors in manual calculations.
• Difficulty identifying outstanding payments.
• Poor financial reporting.
• Difficulty monitoring cashiers' collections.
• Parents having limited access to payment information.
• Poor organization of historical payment records.
School PayPoint aims to address these problems by introducing a centralized digital payment
management system.
3. TARGET USERS
The platform will support four primary user roles and one platform-level administrative role.
SCHOOL PAYPOINT | PRODUCT REQUIREMENTS DOCUMENT
Page 23.1 Super Administrator
The Super Administrator manages the entire School PayPoint platform.
• Register and manage schools.
• Approve new school registrations.
• Activate or suspend school accounts.
• Monitor platform activities.
• Manage platform settings.
• View school registration statistics.
3.2 School Administrator
The School Administrator manages financial operations within an individual school.
• Manage school information.
• Register students.
• Manage parents.
• Create fee categories.
• Set school fee structures.
• Assign fees to classes and students.
• Manage cashier accounts.
• Monitor payments.
• Generate financial reports.
3.3 Cashier/Bursar
The Cashier is responsible for receiving and recording payments.
• Search for students.
• View outstanding fees.
• Record cash payments.
• Record bank transfer payments.
• Verify bank transfers.
• Generate official receipts.
• Print receipts.
• Sign receipts physically.
• View payment history.
• Generate daily collection reports.
3.4 Parent/Guardian
Parents can monitor their children's payment information.
• Create an account.
• Access linked children's profiles.
• View school fees.
• Check outstanding balances.
• View payment history.
SCHOOL PAYPOINT | PRODUCT REQUIREMENTS DOCUMENT
Page 3• View and download issued receipts.
• Receive school payment notifications.
3.5 Student
Students will initially exist as registered payment records and will not require individual login accounts.
Student accounts may be introduced in a future version.
4. PRODUCT SCOPE
4.1 MVP Scope
The first release will focus exclusively on school payment management. The following modules will be
implemented:
1. Multi-school registration.
2. Authentication and user management.
3. Student management.
4. Parent management.
5. Fee management.
6. Payment management.
7. Receipt management.
8. Parent portal.
9. Financial reporting.
10. Audit and activity logs.
4.2 Out of Scope for MVP
• Online payment gateway integration.
• School attendance management.
• Examination management.
• Student result management.
• Teacher management.
• Library management.
• School timetable management.
• Transport management.
• Inventory management.
• Full mobile applications.
These features may be introduced in subsequent versions.
5. FUNCTIONAL REQUIREMENTS
FR-01: Multi-School Registration
The system shall allow multiple schools to register independently.
• Schools can submit registration details.
• Schools can provide their name, address, email and contact information.
• Schools can upload their logos.
SCHOOL PAYPOINT | PRODUCT REQUIREMENTS DOCUMENT
Page 4• Each school will have an administrator account.
• Newly registered schools must be approved by the Super Administrator.
• Each school will have a separate workspace.
• Schools must not access another school's records.
FR-02: Authentication and Authorization
The system shall provide secure authentication and role-based access control.
• User login and logout.
• Password recovery.
• Account activation and deactivation.
• Role-based permissions.
• Protected application pages.
• School-level access restrictions.
• Secure session management.
FR-03: Student Management
The system shall allow school administrators to manage student payment records.
Student information shall include:
• Full name.
• Admission number.
• Gender.
• Class.
• Academic session.
• Parent or guardian information.
• Contact information.
• Student status.
Functionalities:
• Register students.
• Edit student information.
• Search students.
• View student profiles.
• Assign students to classes.
• View individual payment statements.
• Maintain historical financial records.
FR-04: Parent Management
The system shall allow parents to access their children's payment information.
• Parent registration.
• Parent account management.
• Link multiple children to one parent.
• View linked student profiles.
SCHOOL PAYPOINT | PRODUCT REQUIREMENTS DOCUMENT
Page 5• View fee statements.
• View payment history.
• Access issued receipts.
FR-05: Fee Management
The system shall allow school administrators to create and manage school fee structures.
Fee categories may include:
• Tuition fees.
• Examination fees.
• PTA levies.
• Development levies.
• Laboratory fees.
• Other school-approved charges.
Requirements:
• Create fee categories.
• Set fee amounts.
• Assign fees to classes.
• Assign fees to academic sessions.
• Assign fees to terms.
• Apply approved discounts and waivers.
• Create student-specific charges.
• Track outstanding balances.
• Maintain historical fee structures.
FR-06: Payment Management
The system shall allow authorized cashiers to record payments made outside the platform.
Supported payment methods:
1. Cash.
2. Bank transfer.
Payment information shall include:
• Student identification.
• Student name.
• Class.
• Academic session.
• Term.
• Fee category or invoice.
• Amount due.
• Amount received.
• Payment method.
• Transaction reference where applicable.
SCHOOL PAYPOINT | PRODUCT REQUIREMENTS DOCUMENT
Page 6• Payment date.
• Cashier identification.
• Payment status.
Requirements:
• Record cash payments.
• Record bank transfer payments.
• Verify bank transfers.
• Record installment payments.
• Calculate outstanding balances automatically.
• Maintain transaction history.
• Support authorized reversals.
• Prevent duplicate payment allocation.
Bank transfer screenshots must not automatically confirm successful payments. Cashiers must verify the
actual bank credit.
FR-07: Receipt Management
The system shall allow authorized cashiers to generate official payment receipts after successful payment
verification.
Receipt information shall include:
• School name.
• School logo.
• School address.
• Receipt number.
• Student name.
• Admission number.
• Class.
• Academic session.
• Term.
• Payment description.
• Amount received.
• Payment method.
• Transaction reference.
• Payment date.
• Cashier's name.
• Physical signature area.
• School stamp area.
• QR verification code.
Requirements:
• Generate unique receipt numbers.
• Generate printable PDF receipts.
SCHOOL PAYPOINT | PRODUCT REQUIREMENTS DOCUMENT
Page 7• Allow cashiers to print receipts.
• Provide space for physical signatures.
• Allow parents to access issued receipts.
• Support receipt reprinting.
• Mark reprinted receipts as copies.
• Record receipt cancellations.
• Maintain receipt verification history.
The receipt will initially be generated digitally and signed physically by the cashier after printing.
FR-08: Parent Portal
The system shall provide a dedicated parent dashboard.
• Parent dashboard.
• Linked children's profiles.
• Fee statements.
• Outstanding balances.
• Payment history.
• Receipt access.
• School announcements.
• Account settings.
Parents shall have read-only access to financial records.
FR-09: Financial Reporting
The system shall generate financial reports for authorized school personnel.
Required reports:
• Daily collection reports.
• Weekly collection reports.
• Monthly collection reports.
• Termly collection reports.
• Outstanding fee reports.
• Cash payment reports.
• Bank transfer reports.
• Cashier collection reports.
• Reversal reports.
Reports shall support PDF and CSV exports.
FR-10: Audit Logs
The system shall maintain records of important activities.
Tracked activities shall include:
• User login.
• Student registration.
• Fee creation.
SCHOOL PAYPOINT | PRODUCT REQUIREMENTS DOCUMENT
Page 8• Payment recording.
• Transfer verification.
• Receipt generation.
• Receipt cancellation.
• Financial reversals.
• User permission changes.
Audit records must identify the responsible user and relevant timestamp.
6. PAYMENT AND RECEIPT WORKFLOW
6.1 Cash Payment Workflow
1. Parent visits the school.
2. Cashier searches for the student.
3. System displays outstanding fees.
4. Cashier enters the amount received.
5. Cashier confirms receiving the cash.
6. System records the payment.
7. System updates the outstanding balance.
8. Cashier generates the receipt.
9. Cashier prints the receipt.
10. Cashier signs the receipt physically.
11. Parent receives the signed receipt.
6.2 Bank Transfer Workflow
1. Parent transfers money into the school's designated bank account.
2. Parent provides the transaction reference.
3. Cashier checks the school's bank account.
4. Cashier confirms the actual credit.
5. Cashier records and verifies the payment.
6. System updates the payment balance.
7. Cashier generates the receipt.
8. Cashier prints and signs the receipt.
6.3 Receipt Verification
Each receipt shall contain a unique verification code or QR code.
Scanning the code should display limited information confirming:
• Receipt number.
• School name.
• Payment date.
• Amount received.
• Student admission number, appropriately masked where necessary.
SCHOOL PAYPOINT | PRODUCT REQUIREMENTS DOCUMENT
Page 9• Receipt validity status.
Private student and parent information must not be publicly exposed.
7. USER INTERFACE REQUIREMENTS
The application shall have a responsive and user-friendly interface.
7.1 Public Pages
• Landing page.
• About page.
• School registration.
• Login.
• Password recovery.
• Receipt verification.
7.2 Super Administrator Dashboard
• Platform overview.
• Registered schools.
• School approval.
• School management.
• User management.
• Platform activity.
• System settings.
7.3 School Administrator Dashboard
• Dashboard overview.
• Student management.
• Parent management.
• Class management.
• Fee categories.
• Fee structures.
• Student invoices.
• Payments.
• Receipts.
• Financial reports.
• Cashier management.
• Settings.
7.4 Cashier Dashboard
• Daily collection summary.
• Record cash payment.
• Record bank transfer.
• Pending transfer verification.
SCHOOL PAYPOINT | PRODUCT REQUIREMENTS DOCUMENT
Page 10• Verified transactions.
• Student search.
• Generate receipt.
• Receipt history.
• Daily collection reports.
7.5 Parent Dashboard
• Overview.
• My children.
• Fee statements.
• Payment history.
• Receipts.
• Notifications.
• Profile settings.
8. DATABASE REQUIREMENTS
The system shall use PostgreSQL as its primary relational database.
Recommended tables:
1. schools
2. users
3. school_members
4. students
5. parents
6. parent_students
7. classes
8. academic_sessions
9. terms
10. fee_categories
11. fee_structures
12. student_invoices
13. payments
14. payment_allocations
15. bank_transfer_evidence
16. receipts
17. receipt_reprints
18. payment_reversals
19. audit_logs
20. notifications
Database requirements:
• Every school-owned record must be associated with a school ID.
SCHOOL PAYPOINT | PRODUCT REQUIREMENTS DOCUMENT
Page 11• Admission numbers must be unique within each school.
• Receipt numbers must be unique within each school.
• Parents must only access their linked children.
• Cashiers must only access their assigned school's records.
• Financial records must not be silently deleted.
• Payment allocations must be transactionally consistent.
• Monetary values must use appropriate decimal-safe database types.
9. NON-FUNCTIONAL REQUIREMENTS
9.1 Security
• Secure authentication.
• Role-based authorization.
• PostgreSQL Row Level Security.
• School-level data isolation.
• Protected backend APIs.
• Secure file storage.
• Audit trails.
• HTTPS communication.
• Secure database backups.
9.2 Performance
• Dashboard pages should load efficiently.
• Student search should return results quickly.
• Payment records should be paginated.
• Reports should support date filtering.
• The application should handle multiple schools concurrently.
9.3 Usability
• Simple navigation.
• Responsive layouts.
• Clear financial summaries.
• User-friendly forms.
• Clear validation messages.
• Easy receipt printing.
• Accessible interface design.
9.4 Reliability
• Prevent duplicate transaction processing.
• Maintain accurate balances.
• Preserve historical financial records.
• Handle failed requests safely.
SCHOOL PAYPOINT | PRODUCT REQUIREMENTS DOCUMENT
Page 12• Maintain reliable database backups.
9.5 Scalability
The architecture must support:
• Multiple registered schools.
• Increasing numbers of students.
• Multiple cashiers per school.
• Large financial transaction histories.
• Future mobile applications.
• Future school management modules.
10. TECHNOLOGY STACK
Frontend
• React.
• Vite.
• TypeScript.
• Tailwind CSS.
• React Router.
• TanStack Query.
• React Hook Form.
• Zod.
• Lucide React.
Backend
• Node.js.
• Express.js.
• TypeScript.
• REST API architecture.
Database and Authentication
• Supabase.
• PostgreSQL.
• Supabase Auth.
• Row Level Security.
• Supabase Storage.
Additional Technologies
• PDF generation library.
• QR code generation library.
• CSV export functionality.
• Vercel for frontend deployment.
• Render for backend deployment.
SCHOOL PAYPOINT | PRODUCT REQUIREMENTS DOCUMENT
Page 13Future Mobile Development
• React Native.
• Expo.
11. SYSTEM ARCHITECTURE
School PayPoint shall follow a modular application architecture.
The frontend will communicate with the backend through secured REST APIs.
The backend will handle:
• Authentication and authorization.
• School management.
• Student records.
• Fee calculations.
• Payment recording.
• Payment verification.
• Receipt generation.
• Financial reporting.
• Audit logging.
PostgreSQL will store the application's primary records.
The architecture shall support a future mobile application using the same backend APIs.
The Supabase service-role key must remain on the backend and must never be exposed to frontend
users.
12. DEVELOPMENT PHASES
Phase 1: UI/UX Design
• Define brand identity.
• Design landing page.
• Design login and registration.
• Design administrator dashboard.
• Design cashier dashboard.
• Design parent dashboard.
• Design payment forms.
• Design printable receipt.
Phase 2: Frontend Development
• Configure React and Vite.
• Set up TypeScript.
• Configure Tailwind CSS.
• Build reusable components.
• Implement role-based layouts.
• Build dashboards and forms.
SCHOOL PAYPOINT | PRODUCT REQUIREMENTS DOCUMENT
Page 14• Implement responsive design.
Phase 3: Database and Backend
• Create Supabase project.
• Design database tables.
• Implement authentication.
• Implement school registration.
• Configure school-level data isolation.
• Build REST APIs.
• Implement access permissions.
Phase 4: Financial Management
• Implement fee categories.
• Implement fee structures.
• Implement student invoices.
• Implement cash payments.
• Implement bank transfer recording.
• Implement payment verification.
• Implement installment allocation.
Phase 5: Receipt Management
• Implement unique receipt numbering.
• Generate printable PDFs.
• Add cashier signature area.
• Add school stamp area.
• Implement QR verification.
• Implement receipt reprinting and cancellation.
Phase 6: Parent Portal
• Implement parent accounts.
• Link parents to students.
• Display fee statements.
• Display payment history.
• Provide receipt downloads.
Phase 7: Reporting and Testing
• Implement financial reports.
• Implement CSV and PDF exports.
• Test financial calculations.
• Test access permissions.
• Test receipt generation.
• Test multi-school isolation.
SCHOOL PAYPOINT | PRODUCT REQUIREMENTS DOCUMENT
Page 15• Conduct user acceptance testing.
Phase 8: Deployment
• Deploy frontend.
• Deploy backend.
• Configure production database.
• Configure domain and HTTPS.
• Configure backups.
• Onboard pilot schools.
13. MVP ACCEPTANCE CRITERIA
The first release will be considered functionally complete when:
1. Multiple schools can register independently.
2. Super Administrator can approve schools.
3. School administrators can register students.
4. Administrators can create school fee structures.
5. Cashiers can record cash payments.
6. Cashiers can record bank transfers.
7. Bank transfers require actual payment verification.
8. The system calculates outstanding balances accurately.
9. Verified payments can generate official receipts.
10. Receipts can be printed and physically signed.
11. Receipt numbers are unique.
12. Parents can access their linked children's records.
13. Financial reports match recorded transactions.
14. Users cannot access unauthorized school records.
15. Financial corrections are recorded in audit logs.
14. FUTURE EXPANSION
The platform will be develophied in stages.
Version 1: School PayPoint MVP
• School registration.
• Student registration.
• Fee management.
• Cash and bank transfer recording.
• Cashier-generated receipts.
• Parent portal.
• Financial reports.
SCHOOL PAYPOINT | PRODUCT REQUIREMENTS DOCUMENT
Page 16Version 2: Online Payment Integration
• Payment gateway integration.
• Online payment confirmations.
• Automated reconciliation.
Version 3: Complete School Management
• Attendance.
• Academic results.
• Teacher management.
• Timetables.
• Student academic records.
Version 4: Mobile Applications
• Parent mobile application.
• Student mobile application.
• School staff mobile application.
15. BUSINESS MODEL
School PayPoint will operate as a Software-as-a-Service (SaaS) platform.
Schools will subscribe to use the system.
Possible subscription models:
• Basic Plan.
• Standard Plan.
• Premium Plan.
Pricing will be determined after market research, pilot testing and evaluation of hosting and support costs.
The initial MVP will not charge parents for making payments because payment processing will happen
outside the application.
16. PROJECT SUCCESS METRICS
The success of the first release will be evaluated using:
• Number of schools registered.
• Number of active schools.
• Number of registered students.
• Number of payments recorded.
• Accuracy of financial records.
• Number of receipts generated.
• Reduction in manual record-keeping errors.
• Time required to record a payment.
• Parent portal usage.
• School administrator satisfaction.
SCHOOL PAYPOINT | PRODUCT REQUIREMENTS DOCUMENT
Page 1717. CONCLUSION
School PayPoint is designed to solve practical financial management problems experienced by secondary
schools.
The first version will focus on school fee management, payment recording, cashier accountability, official
receipt generation and financial reporting.
Its multi-school architecture will allow different schools to operate independently within one platform.
The product will initially be delivered as a responsive web application, with mobile applications and
additional school management features planned for future releases.
Final Product Vision:
To build a secure, reliable and scalable school payment management platform that simplifies how
secondary schools collect, record, verify and manage financial transactions.
END OF PRODUCT REQUIREMENTS DOCUMENT
Project: School PayPoint | Version: 1.0 | Document Status: Initial MVP Requirements
SCHOOL PAYPOINT | PRODUCT REQUIREMENTS DOCUMENT
