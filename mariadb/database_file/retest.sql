-- phpMyAdmin SQL Dump
-- version 4.4.15.10
-- https://www.phpmyadmin.net
--
-- Client :  localhost
-- Généré le :  Sam 21 Mars 2020 à 09:40
-- Version du serveur :  5.5.64-MariaDB
-- Version de PHP :  5.4.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `retest`
--

-- --------------------------------------------------------

--
-- Structure de la table `Avancements`
--

CREATE TABLE IF NOT EXISTS `Avancements` (
  `id_avancement` int(11) NOT NULL,
  `nom_avancement` varchar(32) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Contenu de la table `Avancements`
--

INSERT INTO `Avancements` (`id_avancement`, `nom_avancement`) VALUES
(1, 'En cours'),
(2, 'A faire'),
(3, 'Fini');

-- --------------------------------------------------------

--
-- Structure de la table `Demandes`
--

CREATE TABLE IF NOT EXISTS `Demandes` (
  `id_demande` int(11) NOT NULL,
  `nom_demande` varchar(32) NOT NULL,
  `nom_demandeur` varchar(32) NOT NULL,
  `description` text NOT NULL,
  `date_demande` date NOT NULL,
  `date_chiffrage` date DEFAULT NULL,
  `date_demarrage` date DEFAULT NULL,
  `date_livraison` date DEFAULT NULL,
  `code_nop` varchar(32) NOT NULL,
  `fonction` varchar(32) NOT NULL,
  `reference_client` varchar(32) DEFAULT NULL,
  `validation_chiffrage` varchar(32) DEFAULT NULL,
  `remarque_validation` text,
  `reference_interne` varchar(32) NOT NULL,
  `Total` double DEFAULT NULL,
  `fk_utilisateur_id` int(11) NOT NULL,
  `fk_etat_id` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=latin1;

--
-- Contenu de la table `Demandes`
--

INSERT INTO `Demandes` (`id_demande`, `nom_demande`, `nom_demandeur`, `description`, `date_demande`, `date_chiffrage`, `date_demarrage`, `date_livraison`, `code_nop`, `fonction`, `reference_client`, `validation_chiffrage`, `remarque_validation`, `reference_interne`, `Total`, `fk_utilisateur_id`, `fk_etat_id`) VALUES
(20, 'nom_demande', 'nom_demandeur', 'desc', '2020-01-31', '2020-03-18', NULL, NULL, 'code', 'fonc', 'ref_cli', NULL, NULL, 'ref_int', 12225, 1, 3),
(23, 'test_date', 'test_date', 'uy', '2020-01-31', NULL, NULL, NULL, '123', 'ref', 'ref', NULL, NULL, 'ref', NULL, 1, 3),
(24, 'projet cap', 'ahmed', 'projet de test', '2020-01-31', '2020-03-04', NULL, NULL, 'x213', 'fonction1', 'alsawah', NULL, NULL, 'ref1', NULL, 1, 3),
(26, 'Projet Capgemini', 'thomas', 'projet master tri', '2020-02-02', '2020-03-05', NULL, NULL, 'x565', 'étudiant', 'thomas', 'Chiffrage accepté', 'ceci est un commentaire magnifique de test', 'thomas', NULL, 2, 4),
(28, 'const', 'rem', 'const', '2020-02-14', '2020-03-12', NULL, NULL, '100', 'yyyyy', 'evng', NULL, NULL, '2', 204800, 2, 3),
(29, 'remtest', 'rem', 'const', '2020-02-14', '2020-03-11', NULL, NULL, '100', '2', 'egd', NULL, NULL, '100', 43100, 1, 3),
(34, 'GT DATA - MIGRATION VERS AIX', 'Stéphane JUBEAU', 'construction de l''architecture d''hébergement de l''application Abus de Marché de Reuters :\n\napplication 3-Tiers : AS, BDD, ETL\n3 environnements : Dev, Homol et Production\n\n- AS : 4 VM RHEL + Oracle JDK\n- ETL : 3 VM RHEL + Oracle JRE\n- BDD : 2 LPAR avec BDD Oracle\n- publication application Citrix\n\nCriticité Application : a définir suite retrait de la redondance\nPCA/PRA : à definir suite retrait de la redondance\n5 utilisateurs\nenviron 4 To de stockage', '2020-02-29', '2020-03-12', NULL, NULL, 'A DEFINIR', 'CDP', 'F45', NULL, NULL, 'X24', 30581366, 1, 2),
(37, 'Projet1BDD', 'hugo', 'reunion du 04/3', '2020-03-04', NULL, NULL, NULL, 'cn', 'f', 'rc', NULL, NULL, 'ri', NULL, 1, 3),
(38, 'Projet', 'e', 'sqdqsd', '2020-03-04', '2020-03-04', NULL, NULL, 'e', 'e', 'e', NULL, NULL, 'e', NULL, 1, 3),
(39, 'edf_serveur', 'edf', 'serveur', '2020-03-12', '2020-03-18', NULL, NULL, '50', 'ba', '100', 'Chiffrage accepté', '', 'ba', 44, 2, 3),
(51, 'testrens', 'testrens', 'testrens', '2020-03-12', '2020-03-12', NULL, NULL, 'Non renseigné', 'Non renseignée', 'Non renseignée', NULL, NULL, 'Non renseignée', 34636, 2, 3),
(58, 'test18', 'test', 'oui', '2020-03-18', NULL, NULL, NULL, 'Non renseigné', 'Non renseignée', 'Non renseignée', NULL, NULL, 'Non renseignée', NULL, 1, 1),
(61, 'test19', 'ahmedm', 'req', '2020-03-18', NULL, NULL, NULL, 'Non renseigné', 'Non renseignée', 'Non renseignée', NULL, NULL, 'Non renseignée', NULL, 1, 1);

-- --------------------------------------------------------

--
-- Structure de la table `Demandes_Perimetres`
--

CREATE TABLE IF NOT EXISTS `Demandes_Perimetres` (
  `fk_demande_id` int(11) DEFAULT NULL,
  `fk_perimetre_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `Demandes_Perimetres`
--

INSERT INTO `Demandes_Perimetres` (`fk_demande_id`, `fk_perimetre_id`) VALUES
(20, 1),
(20, 2),
(23, 6),
(24, 1),
(24, 3),
(24, 4),
(26, 1),
(26, 3),
(26, 4),
(28, 1),
(28, 4),
(29, 8),
(29, 9),
(34, 1),
(34, 2),
(34, 3),
(34, 4),
(34, 5),
(34, 6),
(34, 8),
(37, 3),
(37, 5),
(38, 1),
(39, 5),
(39, 7),
(58, 8),
(58, 9),
(61, 6),
(61, 7);

-- --------------------------------------------------------

--
-- Structure de la table `Etats`
--

CREATE TABLE IF NOT EXISTS `Etats` (
  `id_etat` int(11) NOT NULL,
  `nom_etat` varchar(32) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

--
-- Contenu de la table `Etats`
--

INSERT INTO `Etats` (`id_etat`, `nom_etat`) VALUES
(4, 'Chiffrage Accepté'),
(3, 'Demande Chiffrée'),
(1, 'Demande transmise'),
(7, 'Projet Annulé'),
(5, 'Projet en cours'),
(6, 'Projet livré'),
(2, 'Traitement en cours');

-- --------------------------------------------------------

--
-- Structure de la table `Ligne_Chiffrages`
--

CREATE TABLE IF NOT EXISTS `Ligne_Chiffrages` (
  `id_ligne` int(11) NOT NULL,
  `fk_demande_id` int(11) NOT NULL,
  `nom_etape` varchar(250) NOT NULL,
  `nom_sous_etape` varchar(250) NOT NULL,
  `nom_acteur` varchar(250) NOT NULL,
  `nom_grade` varchar(250) NOT NULL,
  `valeur_charge` double NOT NULL,
  `valeur_tjm` double NOT NULL,
  `valeur_total` double NOT NULL,
  `remarque` text,
  `fk_avancement_id` int(11) NOT NULL DEFAULT '2'
) ENGINE=InnoDB AUTO_INCREMENT=612 DEFAULT CHARSET=latin1;

--
-- Contenu de la table `Ligne_Chiffrages`
--

INSERT INTO `Ligne_Chiffrages` (`id_ligne`, `fk_demande_id`, `nom_etape`, `nom_sous_etape`, `nom_acteur`, `nom_grade`, `valeur_charge`, `valeur_tjm`, `valeur_total`, `remarque`, `fk_avancement_id`) VALUES
(122, 23, 'tetre', 'retretre', 'tetr', 'retret', 0, 0, 13, NULL, 2),
(188, 26, 'premiere etape', 'premiere sous etape', 'oui', '1', 10, 1, 1, 'test', 2),
(209, 24, 'rt', 'r', 'ytr', '10', 0, 75, 257, 'ik', 2),
(210, 24, 'rt', 'oè', 'y', '1', 0, 1, 4, 'ol', 2),
(235, 20, '4', '4', '4', '4', 4, 4, 4, '4', 2),
(242, 20, '4', '4', '4', '4', 4, 4, 4, '4', 2),
(262, 20, 'r', '10', '110', '10', 10, 10, 10, '10', 2),
(267, 20, 'r', 'r', 'r', '10', 0, 10, 10, '10', 2),
(268, 20, 'e', 'e', 'e', '1', 0, 2100, 10, '10', 2),
(269, 20, 'e', 'e', 'e', '10', 0, 10, 101, '10', 2),
(270, 20, '1', '1', '1', '1', 1, 1, 10, '10', 2),
(271, 20, 'e', 'e', 'e', '10', 0, 1, 10, '0', 2),
(272, 20, 'r', 'r', 'r', '1', 10, 24, 412, '257', 2),
(273, 20, 'r', '2', '2', '2', 2, 2, 2, '2', 2),
(274, 20, '10', '10', '1', '10', 0, 10, 10, '10', 2),
(275, 20, '10', '10', '10', '0', 1, 10, 10, '10', 2),
(276, 20, '100', '100', 'tho', '10', 100, 1000, 10000, 'oui', 2),
(277, 20, '100', '0', '100', '0', 0, 0, 0, '', 2),
(278, 20, '4', '4', '4', '4', 4, 4, 4, '4', 2),
(279, 20, 'g', 'r', 'r', '1', 0, 2, 1, '1', 2),
(280, 20, '4', '4', '4', '4', 4, 4, 4, '4', 2),
(282, 20, 'e', '10', 'e', 'Admin', 0, 10, 10, '10', 2),
(283, 20, 'e', '10', 'e', 'Admin', 0, 10, 10, '10', 2),
(284, 20, 't', '10', 't', 'Admin', 0, 10, 10, '10', 2),
(285, 20, '424', '2424', '42', '42', 42, 24, 24, '2424', 2),
(286, 20, '424', '2424', '412', 'Admin', 0, 24, 24, '2424', 2),
(287, 23, 'tetre', 'retretre', 'tetr', 'retret', 1, 0, 13, NULL, 2),
(288, 20, '1', '1', '1', '1', 1, 1, 1, '1', 2),
(292, 20, 'u', '757', 'k', '75', 74, 57, 57, '', 2),
(293, 23, 'toto', 'hfg', 'hfg', '5', 0, 2, 2, 'hg', 2),
(294, 20, 'r', 'r', 'r', '1', 0, 1, 1, NULL, 2),
(295, 23, 'tf', 't', 't', '4', 0, 4, 4, NULL, 2),
(296, 23, 'tf', '4', '4', '4', 4, 4, 2, '4', 2),
(297, 23, 'e', 'e', 'e', '10', 0, 10, 10, '10', 2),
(298, 37, 'installation serveur', 'definition de la baie de stockag', 'b2', '2', 1, 1000, 1000, 'premier', 2),
(299, 37, 'installation serveur', 'specification', 'b1', '1', 3, 200, 600, 'second', 2),
(301, 37, 'installation serveur', 'a', 'a', '2', 2, 2, 2, '2', 2),
(302, 37, 'installation serveur', 'a', 'a', '2', 2, 2, 4, '2', 2),
(303, 37, 'ee', 'e', 'e', '1', 1, 1, 1, 'eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', 2),
(304, 20, 'ol', 'k', 'e41', 'oik1', 4, 41, 14, '41', 2),
(305, 20, 'r', 'r', 'r', 'r', 2, 2, 12, '2', 2),
(306, 20, 'r', 'p', 'p', 'p', 10, 10, 1000, '10', 2),
(308, 20, 'e', 'e', 'e', '11', 10, 10, 0, '10', 2),
(309, 20, 'e', '4', '4', '4', 4, 4, 0, '4', 2),
(310, 20, 'e', 'e', 'e', 'e', 10, 10, 0, '10', 2),
(311, 20, 'e10', '10', '10', '10', 10, 10, 10, '10', 2),
(312, 20, 'e', 'e', 'e', '10', 10, 10, 0, 'e', 2),
(313, 20, 'e', 'e', 'e', 'e', 10, 10, 0, '100', 2),
(314, 20, 'a', 'a', 'a', 'a', 4, 5, 0, 'm', 2),
(316, 20, '7', '7', '7', '7', 7, 7, 0, '7', 2),
(317, 20, 'e', 'e', '7', '7', 7, 7, 0, '4', 2),
(318, 20, '4', '4', '4', '4', 4, 4, 0, '4', 2),
(319, 20, '4', '4', '4', '4', 4, 5, 0, '4', 2),
(328, 20, 'toto', 'toto', 'a1', 'b1', 10, 5, 50, 'ee', 2),
(329, 20, 'e', 'e', 'e', '10', 10, 10, 100, '10', 2),
(330, 20, '10', '10', '10', '10', 10, 10, 100, '10', 2),
(331, 20, 'e', 'e', 'e', '10', 10, 10, 100, '10', 2),
(332, 20, '10', '10', '10', '10', 10, 10, 100, '10', 2),
(333, 23, 'r', 'r', 'r', '1', 1, 1, 1, '1', 2),
(334, 23, 'e', 'e', 'e', '10', 10, 10, 100, '10', 2),
(367, 29, '1', '1', '1', '1', 1, 10000, 10000, NULL, 2),
(368, 29, '2', '2', 'yu', 'b1', 3, 1000, 3000, '100', 2),
(369, 29, '2', '2', 'yu', '10', 1, 100, 100, '', 2),
(385, 29, '2', '2', 'yu', 'b1', 3, 10000, 30000, '100', 2),
(520, 51, '1', '1', '1', '1', 1, 1, 1, '1', 2),
(521, 51, '10', '10', '10', '10', 10, 1000, 10000, '10', 2),
(522, 51, '35', '35', '35', '35', 35, 355, 12425, '', 2),
(523, 51, '22', '22', '22', '22', 22, 555, 12210, '55', 2),
(524, 51, '500', '100', '100', '100', 100, 888, 88800, NULL, 2),
(525, 28, '100', '100', '1001', '100', 100, 2048, 204800, 'oui', 2),
(527, 28, '8', '8', '8', '99', 88, 12345, 1086360, 'tytyt', 2),
(555, 34, 'PRE REQUIS', 'NOMMAGE SRV+BDD', 'COVEA FI', 'B2', 1, 20, 20, NULL, 2),
(558, 34, 'PRE REQUIS', 'CONFIG VM', 'COVEA FI', 'B2', 1, 50, 50, NULL, 2),
(560, 34, 'PRE REQUIS', 'LICENCE OS ET BDD', 'COVEA FI', 'B2', 1, 200, 200, NULL, 2),
(563, 34, 'PREPARATION', 'Etude, chiffrage, validation des pré requis', 'DBA', 'B2', 2, 200, 400, NULL, 2),
(611, 39, '2', '2', '2', '2', 22, 2, 44, '2', 2);

-- --------------------------------------------------------

--
-- Structure de la table `Perimetres`
--

CREATE TABLE IF NOT EXISTS `Perimetres` (
  `id_perimetre` int(11) NOT NULL,
  `nom_perimetre` varchar(32) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

--
-- Contenu de la table `Perimetres`
--

INSERT INTO `Perimetres` (`id_perimetre`, `nom_perimetre`) VALUES
(1, 'Application'),
(9, 'AUTRE'),
(3, 'BDD'),
(2, 'BT/Ordo'),
(6, 'RESEAU'),
(7, 'SAP'),
(8, 'STOCKAGE'),
(4, 'UNIX'),
(5, 'WINDOWS');

-- --------------------------------------------------------

--
-- Structure de la table `Utilisateurs`
--

CREATE TABLE IF NOT EXISTS `Utilisateurs` (
  `id_utilisateur` int(11) NOT NULL,
  `nom_utilisateur` varchar(250) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `prenom_utilisateur` varchar(250) NOT NULL,
  `login_utilisateur` varchar(250) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `nom_entreprise` varchar(32) NOT NULL,
  `mdp_utilisateur` varchar(128) NOT NULL,
  `droit_utilisateur` tinyint(1) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;

--
-- Contenu de la table `Utilisateurs`
--

INSERT INTO `Utilisateurs` (`id_utilisateur`, `nom_utilisateur`, `prenom_utilisateur`, `login_utilisateur`, `nom_entreprise`, `mdp_utilisateur`, `droit_utilisateur`) VALUES
(1, 'Admin', '', '', 'Cap Gemini', 'ba3253876aed6bc22d4a6ff53d8406c6ad864195ed144ab5c87621b6c233b548baeae6956df346ec8c17f5ea10f35ee3cbc514797ed7ddd3145464e2a0bab413', 2),
(2, 'Client', 'Thomas', 'Jamme', 'EDF', 'ba3253876aed6bc22d4a6ff53d8406c6ad864195ed144ab5c87621b6c233b548baeae6956df346ec8c17f5ea10f35ee3cbc514797ed7ddd3145464e2a0bab413', 1),
(14, 'Ahmed', '', '', 'USMB', '5f75697204af47005af5743a6a59feef680c1c846c3f26ca4b885a57f8c47643024f76d37bd85aa75065d3a58b19d3fc1ce99f12d34fe4814dd9c4c3fee49d19', 1),
(15, 'Remi', '', '', '', 'ec20c8dd28e1cf97e3639e6e3e12cba4c4f86bc2ba7bcf105e52f62728e215b61c9055a5d6247191f065a6a2719e65932b3a1945d48801d9bc2ab6d43c46bae1', 1),
(17, 'alsawaha', 'Ahmed', 'AL SAWAH', 'USMB', 'a79346493d0767451b16a388e8c1d84bdd1e29d9b22546659de87c49498d19f5070fde59de32d41f3a0d39e646dc08636542be7db84b30cfaa732fe32f3f3431', 1),
(19, 'Remadmin', 'Rem', 'Cec', 'MASTER TRI', '5c05d25b14799ac1cfbc8a5f45109855e9fd5dd50ff910144f480371978413cb9da91446e524be1aab3a7bcdcc5a76552945596f7a065fdfb9be4610a062a9e0', 2);

--
-- Index pour les tables exportées
--

--
-- Index pour la table `Avancements`
--
ALTER TABLE `Avancements`
  ADD PRIMARY KEY (`id_avancement`);

--
-- Index pour la table `Demandes`
--
ALTER TABLE `Demandes`
  ADD PRIMARY KEY (`id_demande`),
  ADD KEY `fk_utilisateur_id` (`fk_utilisateur_id`),
  ADD KEY `fk_etat_id` (`fk_etat_id`);

--
-- Index pour la table `Demandes_Perimetres`
--
ALTER TABLE `Demandes_Perimetres`
  ADD KEY `Demandes_Perimetres_ibfk_1` (`fk_demande_id`),
  ADD KEY `Demandes_Perimetres_ibfk_2` (`fk_perimetre_id`);

--
-- Index pour la table `Etats`
--
ALTER TABLE `Etats`
  ADD PRIMARY KEY (`id_etat`),
  ADD UNIQUE KEY `nom_etat` (`nom_etat`);

--
-- Index pour la table `Ligne_Chiffrages`
--
ALTER TABLE `Ligne_Chiffrages`
  ADD PRIMARY KEY (`id_ligne`),
  ADD KEY `fk_demande_id` (`fk_demande_id`),
  ADD KEY `fk_avancement_id` (`fk_avancement_id`);

--
-- Index pour la table `Perimetres`
--
ALTER TABLE `Perimetres`
  ADD PRIMARY KEY (`id_perimetre`),
  ADD UNIQUE KEY `nom_perimetre` (`nom_perimetre`);

--
-- Index pour la table `Utilisateurs`
--
ALTER TABLE `Utilisateurs`
  ADD PRIMARY KEY (`id_utilisateur`),
  ADD UNIQUE KEY `nom_utilisateur` (`nom_utilisateur`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `Avancements`
--
ALTER TABLE `Avancements`
  MODIFY `id_avancement` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT pour la table `Demandes`
--
ALTER TABLE `Demandes`
  MODIFY `id_demande` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=62;
--
-- AUTO_INCREMENT pour la table `Etats`
--
ALTER TABLE `Etats`
  MODIFY `id_etat` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT pour la table `Ligne_Chiffrages`
--
ALTER TABLE `Ligne_Chiffrages`
  MODIFY `id_ligne` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=612;
--
-- AUTO_INCREMENT pour la table `Perimetres`
--
ALTER TABLE `Perimetres`
  MODIFY `id_perimetre` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT pour la table `Utilisateurs`
--
ALTER TABLE `Utilisateurs`
  MODIFY `id_utilisateur` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=20;
--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `Demandes`
--
ALTER TABLE `Demandes`
  ADD CONSTRAINT `Demandes_ibfk_1` FOREIGN KEY (`fk_utilisateur_id`) REFERENCES `Utilisateurs` (`id_utilisateur`),
  ADD CONSTRAINT `Demandes_ibfk_2` FOREIGN KEY (`fk_etat_id`) REFERENCES `Etats` (`id_etat`);

--
-- Contraintes pour la table `Demandes_Perimetres`
--
ALTER TABLE `Demandes_Perimetres`
  ADD CONSTRAINT `Demandes_Perimetres_ibfk_1` FOREIGN KEY (`fk_demande_id`) REFERENCES `Demandes` (`id_demande`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Demandes_Perimetres_ibfk_2` FOREIGN KEY (`fk_perimetre_id`) REFERENCES `Perimetres` (`id_perimetre`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `Ligne_Chiffrages`
--
ALTER TABLE `Ligne_Chiffrages`
  ADD CONSTRAINT `Ligne_Chiffrages_ibfk_1` FOREIGN KEY (`fk_demande_id`) REFERENCES `Demandes` (`id_demande`),
  ADD CONSTRAINT `Ligne_Chiffrages_ibfk_2` FOREIGN KEY (`fk_avancement_id`) REFERENCES `Avancements` (`id_avancement`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
