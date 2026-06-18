# GESCOM — Police Station Management System

## Features & Specification Document

---

# 1. Core Features

All features below are directly derived from [`SPECIFICATIONS.md`](./SPECIFICATIONS.md) and organized by division and functional area.

---

## 1.1 Stationary Division (Sédentaire)

### 1.1.1 Secretariat

| # | Feature | Description | Business Purpose | Roles Involved | Main Actions | Dependencies |
|---|---------|-------------|-----------------|----------------|--------------|--------------|
| F01 | **Event Logging (Entry/Exit)** | Record all entry and exit events at the station (visitors, personnel, detainees, vehicles). | Maintain a chronological log of all movements for security and traceability. | Reception Officer, Secretariat Clerk, Station Administrator | Create event, categorize (entry/exit), timestamp, attach person/vehicle details, search/filter logs. | User authentication, Person/Vehicle registry |
| F02 | **Mail Correspondence Tracking** | Track incoming and outgoing official mail/correspondence with references, dates, and status. | Ensure no official correspondence is lost and all responses are tracked. | Secretariat Clerk, Chief of Post, Station Administrator | Register mail (in/out), assign reference number, attach scanned document, set status (pending/answered/archived), notify recipient. | Document attachment module, User directory |
| F03 | **Personnel Registration** | Register and manage police personnel records (civil status, rank, unit, contact, photo, IM number). | Centralize all personnel information for HR management and operational planning. | Station Administrator, Secretariat Clerk, Police Chief | Add/edit personnel, upload photo, assign IM number, set rank/function, manage status (active/suspended/retired). | Role management, Authentication system |
| F04 | **Personnel Behavior Tracking** | Record behavioral incidents, commendations, sanctions, and disciplinary notes per officer. | Maintain a professional conduct history for evaluations and promotions. | Police Chief, Station Administrator, Head of Service | Add behavior entry, link to officer, type (sanction/commendation/incident), attach supporting docs, generate history report. | Personnel Registration |
| F05 | **Personnel Movement Tracking** | Track assignments, transfers, temporary deployments, and shift changes. | Know who is where, when, and for how long; essential for operational readiness. | Station Administrator, Chef de Poste, Head of Service | Record movement, type (transfer/deployment/secondment), dates, destination unit, approve movement. | Personnel Registration |
| F06 | **Loss Declaration** | Record declarations of lost property (personal documents, official items, equipment). | Formalize loss declarations for legal and administrative follow-up. | Secretariat Clerk, Records Clerk, Citizen (declarant) | Create loss declaration, declarant info, item description, circumstances, attach incident report, generate certificate. | Citizen Management, Document templates |
| F07 | **Daily Report** | Generate a daily activity summary for the station. | Provide command with a concise daily operational picture. | Secretariat Clerk, Police Chief | Auto-compile events, incidents, arrests, correspondence; add commander remarks; print/export. | All division modules (data source) |
| F08 | **Weekly Report** | Generate a weekly aggregated activity report. | Track weekly trends and productivity for command review. | Secretariat Clerk, Police Chief | Aggregate daily reports, add commentary, generate PDF/Excel. | Daily Report |
| F09 | **Monthly Report** | Generate a comprehensive monthly statistical report. | Support monthly performance review, national reporting, and strategic planning. | Police Chief, Station Administrator | Compile monthly stats, generate charts/graphs, export in official format. | Daily/Weekly Reports, Statistics engine |

### 1.1.2 Chief of Post (Chef de Poste)

| # | Feature | Description | Business Purpose | Roles Involved | Main Actions | Dependencies |
|---|---------|-------------|-----------------|----------------|--------------|--------------|
| F10 | **Handover / Passation** | Record formal handover of service between outgoing and incoming chiefs of post. | Ensure continuity of command and accountability of all assets and pending matters. | Chief of Post (outgoing/incoming), Police Chief | Create handover document, list pending cases, equipment inventory, asset status, sign digitally. | Asset management, Case management |
| F11 | **Weapon Management (Perception & Reintegration)** | Track issuance (perception) and return (reintegration) of service weapons to/from officers. | Ensure strict accountability of all firearms — a critical security and legal requirement. | Chief of Post, Station Administrator, Officer | Issue weapon to officer, record return, log serial number, condition, ammunition count; alert if overdue. | Personnel Registration, Armory database |
| F12 | **Communication Equipment Management** | Track inventory, issuance, and return of communication devices (radios, phones, etc.). | Ensure all officers have functioning communication gear for duty. | Chief of Post, Station Administrator | Register equipment, assign to officer, track maintenance, log return. | Personnel Registration |
| F13 | **Vehicle Fleet Management** | Manage station vehicles: registration, assignment, fuel, maintenance, incidents. | Ensure vehicle availability and accountability for patrol and response operations. | Chief of Post, Fleet Manager, Officer | Register vehicle, assign to patrol/service, log fuel consumption, schedule maintenance, record accidents. | Personnel Registration |
| F14 | **Custody Situation (Situation GAV)** | Real-time dashboard of all persons in custody (Garde à Vue) with timers, status, and legal limits. | Prevent illegal detention, respect legal custody time limits, and maintain a clear custody picture. | Chief of Post, Officer, Investigator | View custody list, start/end custody timer, record extension, alert approaching legal limit. | Arrest & Detention Management |
| F15 | **Logbook / Main Courante** | Central chronological log of all significant events during a shift. | The primary operational diary of the station; legal record of all events. | Chief of Post, All Officers, Secretariat Clerk | Add log entry, categorize event, timestamp, link to related case/incident, search/filter. | All modules (events feed in) |
| F16 | **Intelligence Dispatch (Envoi de Renseignement)** | Compose and send intelligence/status reports to higher command or other units. | Formal upward communication channel for operational information. | Chief of Post, Head of Service, Investigator | Create dispatch, select recipients, attach supporting documents, encrypt if sensitive, log sent/received. | Document management, Address book |

---

## 1.2 General Service Division (Division Service Général)

| # | Feature | Description | Business Purpose | Roles Involved | Main Actions | Dependencies |
|---|---------|-------------|-----------------|----------------|--------------|--------------|
| F17 | **SPA Management** | Manage the Service de Police d'Appui (support police service) operations and personnel. | Track support unit readiness and deployment. | Head of Service (SG), Officer | Register SPA personnel, schedule deployment, log activities. | Personnel Registration |
| F18 | **Gathering Briefing Information** | Record information communicated during roll call/gathering briefings before each shift. | Ensure all operational information is disseminated and logged. | Head of Service (SG), Officer | Create briefing note, date/time, list attendees, key points, instructions given. | Personnel Registration |
| F19 | **Personnel & Sector Distribution (Day/Night)** | Create and manage daily/nightly shift rosters per sector. | Ensure 24/7 coverage of all sectors with appropriate staffing. | Head of Service (SG), Station Administrator | Define sectors, assign personnel to shift (day/night), publish roster, handle swaps. | Personnel Registration |
| F20 | **Patrol Management** | Plan, assign, and track patrol missions (foot, vehicle, motorized). | Ensure regular patrol coverage and log patrol activities. | Head of Service (SG), Officer, Chief of Post | Create patrol mission, assign team, define route, track start/end, log findings. | Vehicle Management, Personnel Registration |
| F21 | **Intervention Management** | Log and track police interventions in response to calls or incidents. | Record every intervention for legal, statistical, and operational review. | Officer, Head of Service (SG), Dispatcher | Receive alert, dispatch unit, log intervention details, geolocate, attach report. | Incident Reporting, Geolocation |
| F22 | **Exceptional Security Measures (Dispositif Exceptionnel)** | Plan and manage exceptional security operations (VIP visits, events, emergencies). | Coordinate large-scale or high-risk security operations. | Police Chief, Head of Service (SG), Station Administrator | Create operation plan, assign personnel/vehicles, define perimeters, log execution. | Personnel, Vehicle, Equipment Management |
| F23 | **Authority Instructions Log** | Record instructions given by higher authority (prefect, minister, director). | Ensure traceability of all directives received from command hierarchy. | Head of Service (SG), Police Chief | Log instruction, source authority, date, summary, disseminate to relevant units, mark as executed. | Notification system |
| F24 | **Incident Report (with Geolocation)** | Create detailed incident reports for infractions, incidents, accidents, and other events with geolocation. | Primary documentation for all field events; essential for legal proceedings. | Officer, Investigator, Head of Service (SG) | Create report, select type (infraction/incident/accident/other), geolocate, attach evidence, timestamp. | Geolocation, Evidence Management |
| F25 | **Search Operations Management** | Plan and track search operations for persons, vehicles, or evidence. | Coordinate search efforts with full traceability. | Investigator, Head of Service (SG), Officer | Create search operation, define search area, assign teams, log progress, report results. | Personnel, Vehicle, Geolocation |
| F26 | **Patrol Dispatch (Envoi de Renseignement)** | Dispatch operational intelligence from SG division to command or other divisions. | Cross-division communication channel from General Service. | Head of Service (SG), Officer | Create dispatch, attach reports, select recipient unit, confirm receipt. | Reports module |

---

## 1.3 Judicial Police Division (Division PJ)

| # | Feature | Description | Business Purpose | Roles Involved | Main Actions | Dependencies |
|---|---------|-------------|-----------------|----------------|--------------|--------------|
| F27 | **Complaint Registration (Plainte Reçue)** | Register incoming complaints from citizens (direct, seized, or forwarded from prosecutor's office). | Formalize the start of all judicial processes; critical for legal chain of events. | Reception Officer, Investigator, Records Clerk | Register complaint, complainant info, type (direct/saisine/ST parquet), description, attach evidence, assign case number. | Citizen Management, Case Management |
| F28 | **Investigation Case File Registry** | Maintain a registry of all investigation case files with status, assigned investigator, and timeline. | Central case tracking for all judicial investigations. | Investigator, Head of Service (PJ), Records Clerk | Open case file, link to complaint, assign investigator, update status (open/suspended/closed/submitted), log all actions. | Complaint Registration |
| F29 | **Warrant Management (Mandat)** | Register, execute, and track judicial warrants (arrest, search, production warrants). | Ensure all warrants are executed timely and legally accounted for. | Investigator, Head of Service (PJ), Officer | Register warrant, type, issuing authority, target person, status, execution date with report. | Person Management, Case Management |
| F30 | **Summons Management (Convocation)** | Generate and track summons for witnesses, suspects, and victims. | Formalize all official summons with proof of delivery and response tracking. | Investigator, Records Clerk | Create summons, select person, set date/time, method of delivery, log response/compliance. | Citizen Management, Case Management |
| F31 | **Arrest Management** | Record arrest details: arresting officer, location, time, reason, rights read, person information. | Legal requirement for every arrest; supports custody tracking. | Officer, Investigator | Record arrest, link to warrant/complaint, log legal safeguards, notify family/attorney. | Warrant Management, Custody Management |
| F32 | **Custody Management (GAV)** | Full Garde à Vue lifecycle: start, extension, medical visit, lawyer visit, end, transfer. | Ensure full legal compliance for every person in custody. | Investigator, Custody Officer, Medical Examiner | Start GAV, set timer, log extensions (with prosecutor approval), record visits, end GAV (release/transfer). | Arrest Management, Notification |
| F33 | **Requisition Management** | Manage requisitions for expert reports (TPH — Technical Police/Scientific, medical examiner). | Formal requests for forensic or medical expertise in investigations. | Investigator, Head of Service (PJ) | Create requisition, select expert type (TPH/medical), attach case file, set deadline, receive report. | Case Management, Evidence Management |
| F34 | **Wanted Persons Registry** | Maintain a searchable registry of all wanted persons with warrants. | Central wanted list accessible during patrols and interventions. | Investigator, Officer, Head of Service (PJ) | Add wanted person, link to warrant/case, associate photo, set priority, mark as arrested. | Warrant Management |
| F35 | **Seized Objects Management** | Log all items seized during investigations: description, chain of custody, storage location. | Strict legal chain of custody for all seized items; critical for evidence integrity. | Investigator, Evidence Clerk | Register seizure, item description, seize from person, storage location, chain of custody movements, release/disposal. | Case Management, Evidence Management |
| F36 | **Lost Objects Management** | Register lost property reported by citizens (separate from loss declarations). | Help citizens recover lost property; cross-reference with found objects. | Records Clerk, Officer | Register lost item, citizen info, description, date/location of loss, search for matches. | Citizen Management |
| F37 | **Found Objects Management** | Register found property brought to the station. | Return property to rightful owners; reduce station storage burden. | Records Clerk, Officer | Register found item, finder info, description, date/location found, store, match with lost objects. | Lost Objects Management |
| F38 | **Transfer Registry (Registre Déferrement)** | Record transfers of detainees between jurisdictions or to court. | Legal traceability of all detainee movements outside the station. | Investigator, Custody Officer | Register transfer, detainee info, destination, authority ordering transfer, escort details, timestamp. | Custody Management |
| F39 | **PJ Intelligence Dispatch** | Dispatch intelligence/status reports from PJ division to command, prosecutor, or other units. | Judicial communication channel for case status and intelligence sharing. | Head of Service (PJ), Investigator | Create dispatch, attach case file, select recipient, encrypt if sensitive, log. | Case Management, Document Management |

---

## 1.4 Cross-Division / Shared Features

| # | Feature | Description | Business Purpose | Roles Involved | Main Actions | Dependencies |
|---|---------|-------------|-----------------|----------------|--------------|--------------|
| F40 | **Logbook Visibility (Main Courante — Cross-division)** | All divisions can view the main logbook; entries are visible based on permissions. | Ensure shared situational awareness across all units. | All roles (read permissions vary) | View logbook, filter by date/division/category, search. | Logbook (F15) |
| F41 | **Intelligence Search (Chef de Service)** | Heads of service can search all intelligence dispatches across divisions. | Command-level visibility for oversight and coordination. | Head of Service (SG/Sédentaire/PJ), Police Chief | Global search across dispatches, filter by date/division/keyword, view full dispatch. | All dispatch features (F16, F26, F39) |

---

# 2. Technical & Security Features (Mandatory)

| # | Feature | Description | Business Purpose | Roles Involved | Main Actions | Dependencies |
|---|---------|-------------|-----------------|----------------|--------------|--------------|
| F42 | **Login & Authentication** | User login with username, password, position/role (privilège), and IM number. | Secure access control; roles condition all permissions. | All users | Login, logout, password reset, session management. | User Management |
| F43 | **Role-Based Access Control (RBAC)** | Permissions are determined by the assigned position/post (Poste). | Ensure users only access what their role permits. | Super Administrator, Station Administrator | Assign role to user, define permissions per role, enforce access. | Authentication |
| F44 | **No Data Deletion** | Users cannot delete any data; records can only be archived or marked as invalid. | Ensure full data integrity and audit trail; prevent evidence tampering. | All users | Archive record, mark as erroneous (with justification), view history. | Audit Log |
| F45 | **Document Attachments** | Attach files (PDF, Word, images) to reports, cases, complaints, and events. | Support all record types with associated digital evidence. | All roles | Upload file, preview, associate with record, set access level. | File storage system |
| F46 | **Document Templates / Canevas** | Predefined official document templates for reports, dispatches, summons, etc. | Ensure all official documents follow the required format. | All roles | Select template, fill fields, generate document, print/export. | Document Management |
| F47 | **Monitoring & Evaluation Interface** | Dedicated interface for tracking KPIs and evaluating unit/individual performance. | Command oversight for performance management. | Police Chief, Station Administrator, Head of Service | View dashboards, quantify activities, compare against targets, generate evaluation reports. | Statistics engine, all modules |
| F48 | **Geolocation Integration** | Integrated map-based geolocation for incident reports, patrols, interventions, and officer actions. | Visualize operations geographically for better command decisions. | Officer, Investigator, Head of Service | Drop pin, auto-capture GPS, view map layer, geocode actions. | Mapping service, Reports |
| F49 | **Modification History (Previous Versions)** | Track all modifications to records with access to previous versions. | Full audit trail for legal and accountability purposes. | All roles with edit rights | View history, compare versions, restore previous version (with audit). | All data modules |
| F50 | **Modified Version Marking** | Clearly mark records that have been modified with a flag/label showing edit count. | Transparency: readers immediately know if a document has been altered. | All roles (view) | View "Modified" badge, click to see change history. | Modification History |
| F51 | **In-App Notifications** | Notifications within the application for events, assignments, and approvals. | Ensure timely awareness of important events without external tools. | All roles | Receive notification, view list, mark as read, action on notification. | All modules |
| F52 | **Targeted Notifications (Chefs de Service & Cadres)** | Notifications specifically directed to department heads and senior officers. | Ensure command staff are alerted to critical events. | Head of Service, Police Chief, Station Administrator | Receive high-priority notification, acknowledge, escalate if needed. | Notification system |
| F53 | **Division-Specific Notification Interface** | Each division dashboard shows its own notification feed. | Keep notifications relevant and reduce noise. | All roles | View division notification feed, filter, act. | Notification system, Division interfaces |
| F54 | **Statistics & Charts** | Visual statistics with charts (bar, line, pie) for all quantified data. | Data-driven command decisions and reporting. | Police Chief, Head of Service, Station Administrator | View dashboards, filter date range, export charts. | All modules (data source) |
| F55 | **Quantification for Monitoring & Evaluation** | Activity quantification per the official monitoring and evaluation template/canevas. | Direct alignment with national M&E frameworks. | Police Chief, Station Administrator | Configure M&E template, auto-quantify activities, generate M&E report. | All modules, Templates |
| F56 | **Division-Specific Interfaces** | Each division (SG, Sédentaire, PJ) has a tailored interface matching its workflow. | Role-relevant UI improves efficiency and reduces cognitive load. | All roles (per division) | Login redirects to division interface, custom menu, relevant shortcuts. | RBAC, UI framework |
| F57 | **Screenshot Prevention (TPH)** | Prevent screen capture on mobile devices (TPH) using platform security features. | Protect sensitive case data from unauthorized capture. | All mobile users | Flag content as sensitive, enforce OS-level screenshot blocking. | Mobile app, Security module |
| F58 | **Internal Chat / Messaging** | Real-time text chat between station personnel for operational coordination. | Reduce reliance on personal messaging apps; keep communications internal. | All roles | Send message, create group chat, share files, search message history. | User directory |
| F59 | **Online Mapping / Cartography** | Interactive map layer showing station boundaries, sectors, incident locations, and patrol routes. | Visual operational picture for planning and response. | Police Chief, Head of Service, Officer, Investigator | View map, toggle layers (incidents, patrols, personnel location), measure distances. | Geolocation (F48), GIS service |
| F60 | **Geocoded Police Actions (Compte Rendu)** | All officer actions (reports, interventions, patrols) are automatically geocoded on the map. | Visual timeline of all field activities for command review and analysis. | Officer (creates), Command (reviews) | View action on map, filter by date/officer/type, replay timeline. | Geolocation (F48), Reports, Mapping (F59) |
| F61 | **Report Timestamping (Horodotage)** | Every report and action is automatically timestamped with date, time, and timezone. | Legal requirement: precise chronology of all police actions. | All roles (automatic) | Automatic timestamp on creation, displayed on every record. | System clock, Database |

---

# 3. Technical Architecture

## 3.1 Recommended Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Desktop Client** | Electron + React 18 + TypeScript | Cross-platform desktop application |
| **UI Framework** | Vite 6 (build tool), TailwindCSS 3, shadcn/ui (Radix primitives) | Fast development, consistent UI |
| **State Management** | Zustand 5 | Lightweight client state |
| **Server State** | TanStack React Query 5 | API caching & synchronization |
| **Desktop Features** | Electron 33 + electron-builder | Native OS integration (notifications, file system, screenshot blocking) |
| **Backend API** | PHP 8.2+ (Laravel / Slim Framework) | RESTful JSON API |
| **Online Database** | MySQL 8.0+ | Primary server database |
| **Local Database** | SQLite (via better-sqlite3) | Offline-first local cache |
| **Real-time** | WebSocket (Laravel Echo + Pusher or Ratchet) | Live notifications & chat |
| **Mapping** | Leaflet / OpenStreetMap / MapLibre | Geolocation & cartography |
| **File Storage** | Local filesystem + S3-compatible (MinIO) | Document attachments & evidence |

## 3.2 Offline-First Architecture & Synchronization

### 3.2.1 Strategy

The application must work reliably in areas with limited or no internet connectivity. An **offline-first** approach is used:

```
┌──────────────────────────────────────────────────────┐
│                  Electron Desktop App                │
│  ┌────────────────────────────────────────────────┐  │
│  │         React UI (Offline-capable)             │  │
│  └────────────────────┬───────────────────────────┘  │
│  ┌────────────────────▼───────────────────────────┐  │
│  │           State Layer (Zustand)                │  │
│  └────────────────────┬───────────────────────────┘  │
│  ┌────────────────────▼───────────────────────────┐  │
│  │     Sync Engine (React Query + custom worker)  │  │
│  └──────┬─────────────────────────────┬───────────┘  │
│  ┌──────▼──────┐            ┌─────────▼──────────┐   │
│  │   SQLite    │            │   REST API Client  │   │
│  │ (Offline DB)│            │  (Online Fallback) │   │
│  └─────────────┘            └─────────┬──────────┘   │
└───────────────────────────────────────┼──────────────┘
                                        │
                               ┌────────▼────────┐
                               │   PHP REST API  │
                               │   (Laravel)     │
                               └────────┬────────┘
                                        │
                               ┌────────▼────────┐
                               │     MySQL       │
                               │   (Server DB)   │
                               └─────────────────┘
```

### 3.2.2 Synchronization Flow

1. **Read Operations**: Always read from SQLite first. If data is stale or missing, fetch from API and cache locally.
2. **Write Operations (Online)**: Write to API → API acknowledges → write to local SQLite with `synced=TRUE`.
3. **Write Operations (Offline)**: Write to local SQLite with `synced=FALSE` and a `pending_sync` flag → queue sync when connectivity returns.
4. **Background Sync**: On connectivity restore, the sync engine processes all pending records in FIFO order.
5. **Conflict Resolution**: Last-Writer-Wins (LWW) with version vectors. If a conflict is detected, the server version wins by default, but the conflicting local change is preserved in a conflict log for manual review.

### 3.2.3 Conflict Resolution Strategy

| Scenario | Strategy |
|----------|----------|
| Same record edited offline and online | LWW with server timestamp as authority; local change archived |
| Record deleted online, edited offline | Restore deleted record with offline edits flagged for review |
| Concurrent creation (same ID scope) | UUID-based primary keys prevent collision; merge on sync |
| Network failure mid-sync | Transactional sync with rollback on failure; retry with exponential backoff |

### 3.2.4 Offline Data Caching Rules

| Data Type | Cache Strategy | Cache Duration | Sync Priority |
|-----------|---------------|----------------|---------------|
| Reference data (personnel list, ranks, units) | Preload on first sync | Until next sync (server push on change) | High |
| Case/Incident records | Read-through cache | LRU with version check | Medium |
| User sessions & permissions | Preload + periodic refresh | 24h or on role change | High |
| Attachments | Metadata cached; files on-demand | Metadata permanent, files on-demand | Low |
| Audit logs | Write-only (no caching needed) | N/A | Medium |
| Dashboard statistics | Snapshot cache | 5-minute TTL | Low |

---

# 4. User Roles and Permissions

## 4.1 Role Definitions

| Role | Code | Description | Scope |
|------|------|-------------|-------|
| **Super Administrator** | `SUPER_ADMIN` | Full system access, configuration, user management, audit logs | System-wide |
| **Police Chief** | `CHIEF` | Station command: all data read, reports, approvals, evaluations | Station-wide |
| **Station Administrator** | `STATION_ADMIN` | Operational administration: personnel, assets, settings | Station-wide |
| **Head of Service (SG)** | `HEAD_SG` | General Service division management | SG Division |
| **Head of Service (Sédentaire)** | `HEAD_SED` | Stationary division management | Sédentaire Division |
| **Head of Service (PJ)** | `HEAD_PJ` | Judicial Police division management | PJ Division |
| **Investigator** | `INVESTIGATOR` | Case management, warrants, GAV, evidence | PJ Division |
| **Officer** | `OFFICER` | Patrol, intervention, incident reports, arrests | SG / General |
| **Reception Officer** | `RECEPTION` | Front desk: event logging, mail, complaints, citizen reception | Sédentaire |
| **Records Clerk** | `CLERK` | Document management, archives, data entry | All divisions |
| **Custody Officer** | `CUSTODY` | GAV management, detainee transfers | PJ Division |

## 4.2 Permissions Matrix

| Feature / Action | SUPER_ADMIN | CHIEF | STATION_ADMIN | HEAD_* | INVESTIGATOR | OFFICER | RECEPTION | CLERK | CUSTODY |
|---|---|---|---|---|---|---|---|---|---|
| **User Management** | CRUD | R | CRUD | R | - | - | - | - | - |
| **Personnel Registration** | CRUD | R | CRUD | R | - | - | - | R | - |
| **Event Logging** | CRUD | R | R | CRUD | R | R | CRUD | R | - |
| **Mail Tracking** | CRUD | R | R | R | R | R | CRUD | R | - |
| **Complaint Registration** | CRUD | R | R | R | CRUD | - | CRUD | R | - |
| **Case Management** | CRUD | R | R | CRUD | CRUD | R | - | R | R |
| **Warrant Management** | CRUD | R | - | CRUD | CRUD | R | - | R | - |
| **Custody (GAV)** | R | R | R | R | CRUD | R | - | R | CRUD |
| **Patrol Management** | R | R | R | CRUD | R | CRUD | - | R | - |
| **Incident Reports** | CRUD | R | R | CRUD | CRUD | CRUD | - | R | - |
| **Evidence Management** | CRUD | R | R | CRUD | CRUD | CRUD | - | R | CRUD |
| **Reports & Statistics** | CRUD | CRUD | R | CRUD | R | R | R | R | R |
| **Logbook (Main Courante)** | CRUD | CRUD | CRUD | CRUD | CRUD | CRUD | CRUD | R | R |
| **Notifications** | ALL | ALL | ALL | ALL | ALL | ALL | ALL | ALL | ALL |
| **Internal Chat** | ALL | ALL | ALL | ALL | ALL | ALL | ALL | ALL | ALL |
| **Audit Logs** | CRUD | R | R | R | - | - | - | - | - |
| **System Config** | CRUD | R | CRUD | - | - | - | - | - | - |
| **Data Deletion** | - | - | - | - | - | - | - | - | - |
| **Data Archive** | CRUD | CRUD | CRUD | CRUD | R | R | R | R | R |
| **M&E Dashboard** | CRUD | CRUD | CRUD | CRUD | R | - | - | R | - |

**Legend**: C=Create, R=Read, U=Update, D=Delete (archive), -=No access, ALL=Full access to own scope

---

# 5. Security Requirements

## 5.1 Authentication & Authorization

| Requirement | Implementation |
|-------------|----------------|
| **Password Policy** | Minimum 12 characters, uppercase, lowercase, digit, special char; hashed with bcrypt (cost 12) |
| **Session Management** | JWT with refresh tokens; access token TTL = 15 min, refresh token TTL = 24h |
| **Rate Limiting** | Login endpoint: 5 attempts per minute per IP; account lockout after 10 failures |
| **Multi-Factor Auth** | Optional TOTP (time-based one-time password) for sensitive roles (SUPER_ADMIN, CHIEF) |
| **RBAC Enforcement** | Server-side: middleware checks permissions on every API call. Client-side: UI hides unauthorized actions |
| **Screenshot Blocking** | Electron `BrowserWindow` flag `webPreferences.disableBlinkFeatures = 'ScreenCapture'` + OS-level hooks |
| **Inactivity Timeout** | Auto-lock after 15 minutes of inactivity; require password to unlock |

## 5.2 Data Protection

| Requirement | Implementation |
|-------------|----------------|
| **Encryption at Rest (Local)** | SQLite database encrypted with SQLCipher; key derived from user password |
| **Encryption in Transit** | HTTPS/TLS 1.3 for all API communication |
| **Encryption at Rest (Server)** | MySQL TDE (Transparent Data Encryption) at disk level |
| **Sensitive Data** | Personally Identifiable Information (PII) encrypted with AES-256-GCM in database |
| **File/Attachment Security** | Scanned for malware on upload; stored with randomized filenames; access gated by permission |

## 5.3 Audit & Compliance

| Requirement | Implementation |
|-------------|----------------|
| **Audit Trail** | Every CUD operation logged: who, what, when, IP, device, previous value, new value |
| **Activity Logging** | User actions (logins, logouts, failed attempts, permission changes) recorded with timestamp |
| **Data Backup** | Daily automated backup of MySQL database; SQLite sync backup on each application close |
| **Disaster Recovery** | Point-in-time recovery for MySQL; last 30 days of backups retained; offsite copy |
| **Tamper Detection** | Checksum verification on audit logs; alerts on log inconsistency |
| **Digital Signature** | Official documents (reports, dispatches, warrants) signed with user digital certificate |
| **Compliance** | GDPR / Data Protection Act compliance for PII handling; right to access/deletion workflows |

---

# 6. Module Breakdown — Summary

| # | Module | Core Features | Primary Users |
|---|--------|---------------|---------------|
| M01 | **Dashboard** | Role-specific home screen, KPIs, recent activity, quick actions, notifications feed | All users |
| M02 | **Case Management** | Case lifecycle: complaint → investigation → closure; case file registry | Investigator, Head PJ, Clerk |
| M03 | **Incident Reporting** | Incident reports with geolocation, attachments, categories (infraction/incident/accident) | Officer, Investigator |
| M04 | **Criminal Records** | Wanted persons, recidivists, criminal history lookup | Investigator, Officer |
| M05 | **Citizen Management** | Citizen registry: complainants, witnesses, victims, declarants | Reception, Clerk, Investigator |
| M06 | **Officer Management** | Personnel registration, behavior, movements, assignments | Station Admin, Head of Service |
| M07 | **Evidence Management** | Seized/lost/found objects, chain of custody, storage tracking | Investigator, Evidence Clerk |
| M08 | **Arrest & Detention** | Arrests, GAV custody lifecycle, transfers, legal timers | Investigator, Custody Officer |
| M09 | **Vehicle Management** | Fleet registry, assignment, fuel, maintenance, incidents | Chief of Post, Fleet Manager |
| M10 | **Patrol & Intervention** | Patrol planning, dispatching, intervention tracking | Officer, Head SG |
| M11 | **Correspondence & Dispatch** | Mail tracking, intelligence dispatches, document templates | All divisions |
| M12 | **Logbook (Main Courante)** | Centralized chronological event log | All users |
| M13 | **Reports & Analytics** | Daily/weekly/monthly reports, statistics, charts, M&E dashboards | Command, All divisions |
| M14 | **Geolocation & Mapping** | Interactive maps, geocoded actions, sector visualization | Officer, Command |
| M15 | **Communication** | Internal chat, notifications, alerts | All users |
| M16 | **User Management** | User accounts, roles, permissions | Super Admin, Station Admin |
| M17 | **Audit & Compliance** | Audit logs, modification history, version control | Super Admin, Chief |
| M18 | **System Settings** | Station configuration, templates, roles, backup management | Super Admin, Station Admin |
| M19 | **Mobile Interface (TPH)** | Lightweight mobile-optimized interface for field officers | Officer, Investigator |

---

# 7. Additional / Enhancement Features

These features go beyond the strict specification but are strongly recommended for a complete modern Police Station Management System.

| # | Feature | Description | Business Value | Priority |
|---|---------|-------------|----------------|----------|
| E01 | **Advanced Search Engine** | Elasticsearch-powered global search across all modules with fuzzy matching, filters, and saved searches. | Find any record in seconds across the entire system. | High |
| E02 | **Dashboards (Role-Specific)** | Configurable widgets per role: case load, custody status, patrol coverage, incident trends, personnel availability. | Each role sees what matters most at a glance. | High |
| E03 | **Automated Report Scheduling** | Schedule generation and email delivery of daily/weekly/monthly reports. | Reduce manual reporting effort. | Medium |
| E04 | **Evidence Barcode/RFID Tracking** | Generate barcodes/RFID tags for evidence items and track with handheld scanners. | Eliminate evidence misplacement; speed up inventory. | Medium |
| E05 | **Digital Case File Export** | Export complete case files as encrypted digital packages for submission to prosecutor. | Streamline judicial handover. | High |
| E06 | **Field Report Mobile Sync** | Officers in the field can submit reports from mobile devices that sync when connectivity is available. | Increase field reporting speed and accuracy. | High |
| E07 | **Visitor Management** | Digital visitor check-in/out with badge printing, host notification, and blacklist. | Station security and visitor tracking. | Medium |
| E08 | **Duty Roster with Shift Swapping** | Automated roster generation with officer preferences, shift swap approval workflow, and conflict detection. | Fair shift allocation; reduce admin burden. | Medium |
| E09 | **Training & Certification Tracking** | Track officer training, certifications, firearm qualifications, and expiry dates with alerts. | Ensure compliance with training requirements. | Medium |
| E10 | **Leave & Absence Management** | Request, approve, and track annual leave, sick leave, training absences. | Personnel resource planning. | Medium |
| E11 | **Asset Lifecycle Management** | Full lifecycle for all assets (weapons, com equipment, vehicles, IT): acquisition, assignment, maintenance, disposal. | Asset accountability and budget planning. | High |
| E12 | **Emergency Alert / Panic Button** | One-click emergency alert from officer to command with GPS location and live audio/video stream. | Officer safety in dangerous situations. | High |
| E13 | **Case Deadlines & Alerts** | Automatic deadline calculation (custody limits, warrant expiry, case processing times) with escalating alerts. | Prevent legal violations and case delays. | High |
| E14 | **Public Portal (Read-Only)** | External-facing web portal for case status lookup, lost property search, and general station information. | Improve citizen service and transparency. | Low |
| E15 | **Intelligence Bulletin Board** | Division-wide bulletin board for sharing modus operandi alerts, BOLO notices, and intelligence briefs. | Enhance situational awareness across shifts. | Medium |

---

# 8. Future Enhancements (Roadmap)

| # | Feature | Description | Technical Considerations |
|---|---------|-------------|------------------------|
| R01 | **Biometric Identification** | Fingerprint and iris scanner integration for suspect identification and officer check-in. | Hardware SDK integration (e.g., DigitalPersona, Suprema); NIST MINEX compliance |
| R02 | **Facial Recognition** | Match suspect photos against wanted persons database using AI facial recognition. | Offline-capable models (e.g., InsightFace, DeepFace); privacy impact assessment required |
| R03 | **GPS Vehicle Tracking** | Real-time GPS tracking of station vehicles with geofencing and route replay. | IoT GPS hardware; WebSocket for real-time position updates |
| R04 | **Mobile Companion App** | Native mobile app (Android/iOS) for field officers: receive dispatches, submit reports, access wanted database, emergency alerts. | React Native or Flutter; offline-first with same sync architecture |
| R05 | **Digital Evidence Vault** | Secure large-scale digital evidence storage with hash verification, access logging, and retention policies. | S3-compatible object storage; streaming uploads; hash-chain integrity |
| R06 | **AI-Powered Search & Analytics** | Natural language search across case files; predictive analytics for crime hotspots; anomaly detection. | Elasticsearch + ML models (scikit-learn, TensorFlow); GPU inference server |
| R07 | **SMS & Email Notifications** | Automatic SMS and email alerts for victims (case updates), witnesses (summons), and staff (emergency recalls). | Twilio/SMS gateway integration; email via SMTP; template management |
| R08 | **National Database Integration** | API integration with national police databases (criminal records, wanted persons, vehicle registry, Interpol). | National API standards compliance; secure VPN tunnel; data synchronization agreements |
| R09 | **Body Camera Integration** | Ingest, store, and manage body-worn camera footage linked to incidents and cases. | Video streaming/ingestion; large-scale storage; redaction tools |
| R10 | **Automated Transcription & Translation** | Speech-to-text for recorded interviews; translation for multilingual case files. | Whisper (offline STT); LLM-based translation; language detection |
| R11 | **Advanced Data Visualization** | Heat maps, link analysis, time-series forecasting, social network analysis for criminal investigations. | D3.js, WebGL, Graph databases (Neo4j); integration with investigation workflow |
| R12 | **Blockchain Evidence Chain-of-Custody** | Immutable evidence chain-of-custody logging using blockchain/DLT. | Hyperledger or similar; integration with evidence management module |

---

# 9. Data Model Overview (High-Level Entities)

| Entity | Description | Key Relationships |
|--------|-------------|-------------------|
| **User** | System user account | Role, Division, Person (officer) |
| **Person (Citizen/Officer)** | Natural person in the system | User, Address, Attachments |
| **Role** | System role definition | Permissions (many-to-many) |
| **Division** | Organizational unit (SG, Sédentaire, PJ) | Service, Users |
| **Case** | Investigation case | Complaint, Person (involved), Evidence, Warrants, Events |
| **Complaint** | Citizen complaint | Case, Person (complainant), Attachments |
| **IncidentReport** | Field incident report | Case, Person, Geolocation, Attachments |
| **Arrest** | Arrest record | Person, Case, Officer, CustodySession |
| **CustodySession** | GAV session | Arrest, Case, Extensions, Visits, MedicalReports |
| **Evidence** | Seized/lost/found item | Case, Person, Storage, ChainOfCustody |
| **Warrant** | Judicial warrant | Case, Person, ExecutingOfficer |
| **Event** | Logbook entry | Division, User, Case (optional) |
| **Dispatch** | Intelligence dispatch | Division, User, Attachments, Recipients |
| **Personnel** | Officer record | User, Division, Rank, Unit, BehaviorRecords |
| **Vehicle** | Station vehicle | Assignments, MaintenanceLogs, Incidents |
| **Asset** | Equipment/weapon | Person (assignee), MaintenanceLogs |
| **Notification** | System notification | User, Type, ReferenceEntity |
| **AuditLog** | Data change audit | User, Entity, Action, Old/New values |
| **SyncLog** | Offline sync metadata | Entity, Action, Timestamp, Status |

---

*This document is derived from the requirements in `SPECIFICATIONS.md` and is intended as a living reference for development, testing, and project planning.*
