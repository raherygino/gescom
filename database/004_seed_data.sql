-- ============================================
-- Seed: Roles
-- ============================================
INSERT INTO `roles` (`code`, `name`, `description`) VALUES
('SUPER_ADMIN',   'Super Administrator', 'Full system access, configuration, user management, audit logs'),
('CHIEF',         'Police Chief',        'Station command: all data read, reports, approvals, evaluations'),
('STATION_ADMIN', 'Station Administrator', 'Operational administration: personnel, assets, settings'),
('HEAD_SG',       'Head of Service (SG)', 'General Service division management'),
('HEAD_SED',      'Head of Service (Sédentaire)', 'Stationary division management'),
('HEAD_PJ',       'Head of Service (PJ)', 'Judicial Police division management'),
('INVESTIGATOR',  'Investigator',        'Case management, warrants, GAV, evidence'),
('OFFICER',       'Officer',             'Patrol, intervention, incident reports, arrests'),
('RECEPTION',     'Reception Officer',   'Front desk: event logging, mail, complaints, citizen reception'),
('CLERK',         'Records Clerk',       'Document management, archives, data entry'),
('CUSTODY',       'Custody Officer',     'GAV management, detainee transfers');

-- ============================================
-- Seed: Personnel (test records)
-- ============================================
INSERT INTO `personnel` (`im`, `lastname`, `firstname`, `grade`, `fonction`, `email`, `phone`) VALUES
('ADM-001', 'Admin',    'System',    'Commissaire Divisionnaire', 'Super Administrator', 'admin@opus.test',  '+221 77 000 00 01'),
('CH-001',  'Diop',     'Mamadou',   'Commissaire',               'Police Chief',        'chief@opus.test',  '+221 77 000 00 02'),
('SG-001',  'Ndiaye',   'Fatou',     'Commissaire Adjoint',       'Head of Service SG',  'head.sg@opus.test','+221 77 000 00 03'),
('SED-001', 'Fall',     'Ousmane',   'Commissaire Adjoint',       'Head of Service Sédentaire', 'head.sed@opus.test', '+221 77 000 00 04'),
('PJ-001',  'Ba',       'Aminata',   'Commissaire Adjoint',       'Head of Service PJ',  'head.pj@opus.test','+221 77 000 00 05'),
('INV-001', 'Sow',      'Ibrahima',  'Lieutenant',                'Investigator',        'invest@opus.test', '+221 77 000 00 06'),
('OFF-001', 'Kane',     'Marième',   'Brigadier-Chef',            'Officer',             'officer@opus.test','+221 77 000 00 07'),
('REC-001', 'Gueye',    'Alpha',     'Garde de la Paix',          'Reception Officer',   'reception@opus.test','+221 77 000 00 08'),
('CLK-001', 'Thiam',    'Aïcha',     'Secrétaire Administratif',  'Records Clerk',       'clerk@opus.test',  '+221 77 000 00 09'),
('CUS-001', 'Sy',       'Pape',      'Brigadier',                 'Custody Officer',     'custody@opus.test','+221 77 000 00 10');

-- ============================================
-- Seed: Users (password = "password123" hashed with bcrypt)
-- ============================================
INSERT INTO `users` (`personnel_id`, `username`, `password_hash`, `role_id`, `is_active`) VALUES
-- SUPER_ADMIN
(1,  'admin',    '$2y$12$s/ragHrU9Vf4gP1CzxXvvODFx5c60eFDCGXI2k8LZEKxQ.8hs1WDm', (SELECT id FROM `roles` WHERE `code` = 'SUPER_ADMIN'), 1),
-- CHIEF
(2,  'mdiop',    '$2y$12$s/ragHrU9Vf4gP1CzxXvvODFx5c60eFDCGXI2k8LZEKxQ.8hs1WDm', (SELECT id FROM `roles` WHERE `code` = 'CHIEF'), 1),
-- HEAD_SG
(3,  'fndiaye',  '$2y$12$s/ragHrU9Vf4gP1CzxXvvODFx5c60eFDCGXI2k8LZEKxQ.8hs1WDm', (SELECT id FROM `roles` WHERE `code` = 'HEAD_SG'), 1),
-- HEAD_SED
(4,  'ofall',    '$2y$12$s/ragHrU9Vf4gP1CzxXvvODFx5c60eFDCGXI2k8LZEKxQ.8hs1WDm', (SELECT id FROM `roles` WHERE `code` = 'HEAD_SED'), 1),
-- HEAD_PJ
(5,  'aba',      '$2y$12$s/ragHrU9Vf4gP1CzxXvvODFx5c60eFDCGXI2k8LZEKxQ.8hs1WDm', (SELECT id FROM `roles` WHERE `code` = 'HEAD_PJ'), 1),
-- INVESTIGATOR
(6,  'isow',     '$2y$12$s/ragHrU9Vf4gP1CzxXvvODFx5c60eFDCGXI2k8LZEKxQ.8hs1WDm', (SELECT id FROM `roles` WHERE `code` = 'INVESTIGATOR'), 1),
-- OFFICER
(7,  'mkane',    '$2y$12$s/ragHrU9Vf4gP1CzxXvvODFx5c60eFDCGXI2k8LZEKxQ.8hs1WDm', (SELECT id FROM `roles` WHERE `code` = 'OFFICER'), 1),
-- RECEPTION
(8,  'agueye',   '$2y$12$s/ragHrU9Vf4gP1CzxXvvODFx5c60eFDCGXI2k8LZEKxQ.8hs1WDm', (SELECT id FROM `roles` WHERE `code` = 'RECEPTION'), 1),
-- CLERK
(9,  'athiam',   '$2y$12$s/ragHrU9Vf4gP1CzxXvvODFx5c60eFDCGXI2k8LZEKxQ.8hs1WDm', (SELECT id FROM `roles` WHERE `code` = 'CLERK'), 1),
-- CUSTODY
(10, 'psy',      '$2y$12$s/ragHrU9Vf4gP1CzxXvvODFx5c60eFDCGXI2k8LZEKxQ.8hs1WDm', (SELECT id FROM `roles` WHERE `code` = 'CUSTODY'), 1);
