import {
  Document,
  Page,
  StyleSheet,
  Text,
  View
} from "@react-pdf/renderer";

export type ResumePdfData = {
  name: string;
  role: string;
  email?: string;
  location?: string;
  fullText?: string;
  template?: "classic" | "modern" | "compact";
  summary: string;
  skills: string[];
  bullets: string[];
};

const styles = StyleSheet.create({
  page: {
    padding: 42,
    fontSize: 10,
    color: "#172235",
    fontFamily: "Helvetica",
    lineHeight: 1.45
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: "#d8d0c3",
    paddingBottom: 12,
    marginBottom: 18
  },
  name: {
    fontSize: 24,
    fontFamily: "Helvetica-Bold",
    color: "#184f7d"
  },
  role: {
    marginTop: 4,
    fontSize: 11,
    color: "#117b77"
  },
  section: {
    marginTop: 14
  },
  sectionTitle: {
    fontSize: 9,
    color: "#184f7d",
    fontFamily: "Helvetica-Bold",
    letterSpacing: 1.6,
    textTransform: "uppercase",
    marginBottom: 7
  },
  paragraph: {
    fontSize: 10
  },
  skillRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6
  },
  skill: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    backgroundColor: "#e6f1ef",
    color: "#117b77",
    fontSize: 9
  },
  bullet: {
    marginBottom: 6
  },
  templatePage: {
    paddingTop: 14,
    paddingHorizontal: 30,
    paddingBottom: 14,
    fontSize: 8.6,
    color: "#000000",
    fontFamily: "Helvetica",
    lineHeight: 1.16
  },
  modernPage: {
    paddingTop: 22,
    paddingHorizontal: 34,
    paddingBottom: 22,
    fontSize: 9,
    color: "#132238",
    fontFamily: "Helvetica",
    lineHeight: 1.22
  },
  modernName: {
    fontSize: 24,
    fontFamily: "Helvetica-Bold",
    color: "#0f5f6d",
    marginBottom: 4,
    lineHeight: 1.05
  },
  modernLongName: {
    fontSize: 20
  },
  modernExtraLongName: {
    fontSize: 17
  },
  modernContacts: {
    fontSize: 8.5,
    color: "#4d5d67",
    borderBottomWidth: 1,
    borderBottomColor: "#b8d6d5",
    paddingBottom: 8,
    marginBottom: 8
  },
  modernSectionTitle: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: "#0f5f6d",
    textTransform: "uppercase",
    marginTop: 9,
    marginBottom: 5
  },
  compactPage: {
    paddingTop: 20,
    paddingHorizontal: 28,
    paddingBottom: 18,
    fontSize: 8,
    color: "#111111",
    fontFamily: "Helvetica",
    lineHeight: 1.12
  },
  compactName: {
    fontSize: 20,
    fontFamily: "Helvetica-Bold",
    textAlign: "left",
    marginBottom: 3,
    lineHeight: 1.05
  },
  compactLongName: {
    fontSize: 17
  },
  compactExtraLongName: {
    fontSize: 15
  },
  compactContacts: {
    fontSize: 8,
    marginBottom: 5
  },
  compactSectionTitle: {
    borderTopWidth: 0.75,
    borderTopColor: "#111111",
    paddingTop: 3,
    fontSize: 8.5,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    marginTop: 7,
    marginBottom: 3
  },
  templateName: {
    fontSize: 26,
    fontFamily: "Helvetica-Bold",
    textAlign: "center",
    letterSpacing: 0.6,
    marginBottom: 6,
    lineHeight: 1.05
  },
  templateLongName: {
    fontSize: 21
  },
  templateExtraLongName: {
    fontSize: 18
  },
  templateContacts: {
    textAlign: "center",
    fontSize: 8.5,
    marginBottom: 8
  },
  templateSection: {
    marginTop: 9
  },
  templateSectionTitle: {
    borderTopWidth: 1,
    borderTopColor: "#000000",
    borderBottomWidth: 1,
    borderBottomColor: "#000000",
    paddingVertical: 4,
    textAlign: "center",
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    marginBottom: 6
  },
  templateParagraph: {
    fontSize: 8.6,
    marginBottom: 3
  },
  templateBoldLine: {
    fontSize: 8.6,
    fontFamily: "Helvetica-Bold",
    marginTop: 4,
    marginBottom: 1
  },
  templateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginTop: 4,
    marginBottom: 1
  },
  templateRowLeft: {
    flexGrow: 1,
    flexShrink: 1,
    fontFamily: "Helvetica-Bold"
  },
  templateRowRight: {
    minWidth: 48,
    textAlign: "right"
  },
  templateSkillGrid: {
    flexDirection: "row",
    flexWrap: "wrap"
  },
  templateSkillItem: {
    width: "50%",
    paddingRight: 10,
    marginBottom: 2
  }
});

const SECTION_HEADERS = new Set([
  "SUMMARY",
  "WORK EXPERIENCE",
  "EXPERIENCE",
  "EDUCATION",
  "PROJECTS",
  "SKILLS",
  "CERTIFICATE",
  "CERTIFICATES",
  "CERTIFICATIONS",
  "ACHIEVEMENTS",
  "COURSEWORK",
  "LEADERSHIP",
  "VOLUNTEERING",
  "ACTIVITIES",
  "LANGUAGES",
  "PUBLICATIONS",
  "AWARDS",
  "INTERESTS"
]);

type ParsedSection = {
  title: string;
  lines: string[];
};

function cleanLine(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function isKnownSectionHeader(value: string) {
  return SECTION_HEADERS.has(cleanLine(value).toUpperCase());
}

function isSectionHeader(value: string) {
  const clean = cleanLine(value);
  const line = clean.toUpperCase();

  if (isKnownSectionHeader(line)) {
    return true;
  }

  return (
    clean === line &&
    line.length >= 3 &&
    line.length <= 42 &&
    /^[A-Z][A-Z0-9 &/+.-]+$/.test(line) &&
    !/\d{4}/.test(line) &&
    !line.includes(",")
  );
}

function parseResumeText(value: string) {
  const lines = value
    .split(/\r?\n/)
    .map(cleanLine)
    .filter(Boolean);
  const firstSectionIndex = lines.findIndex(isKnownSectionHeader);
  const headerLines =
    firstSectionIndex >= 0 ? lines.slice(0, firstSectionIndex) : lines.slice(0, 2);
  const bodyLines =
    firstSectionIndex >= 0 ? lines.slice(firstSectionIndex) : lines.slice(2);
  const sections: ParsedSection[] = [];

  for (const line of bodyLines) {
    if (isSectionHeader(line)) {
      sections.push({ title: cleanLine(line).toUpperCase(), lines: [] });
    } else if (sections.length) {
      sections[sections.length - 1].lines.push(line);
    }
  }

  return {
    name: headerLines[0] ?? "Resume",
    contacts: headerLines.slice(1).join("  |  "),
    sections
  };
}

function splitYear(line: string) {
  const match = line.match(/^(.*?)(\s+((?:20|19)\d{2}(?:\s*-\s*(?:20|19)\d{2})?|Present))$/i);

  if (!match) {
    return null;
  }

  return {
    left: match[1].trim(),
    right: match[3].trim()
  };
}

function looksLikeHeading(line: string) {
  return (
    line.length < 95 &&
    !/[.?!]$/.test(line) &&
    (/^[A-Z0-9]/.test(line) || line.includes("—") || line.includes("-"))
  );
}

function getNameStyle(name: string, template: ResumePdfData["template"]) {
  const length = cleanLine(name).length;

  if (template === "modern") {
    return [
      styles.modernName,
      ...(length > 26 ? [styles.modernLongName] : []),
      ...(length > 38 ? [styles.modernExtraLongName] : [])
    ];
  }

  if (template === "compact") {
    return [
      styles.compactName,
      ...(length > 24 ? [styles.compactLongName] : []),
      ...(length > 36 ? [styles.compactExtraLongName] : [])
    ];
  }

  return [
    styles.templateName,
    ...(length > 24 ? [styles.templateLongName] : []),
    ...(length > 36 ? [styles.templateExtraLongName] : [])
  ];
}

function TemplateSection({
  section,
  template = "classic"
}: {
  section: ParsedSection;
  template?: ResumePdfData["template"];
}) {
  const isSkills = section.title === "SKILLS";
  const isSummary = section.title === "SUMMARY";
  const sectionTitleStyle =
    template === "modern"
      ? styles.modernSectionTitle
      : template === "compact"
        ? styles.compactSectionTitle
        : styles.templateSectionTitle;
  const paragraphStyle =
    template === "compact" ? styles.templateParagraph : styles.templateParagraph;

  return (
    <View style={styles.templateSection}>
      <Text style={sectionTitleStyle}>{section.title}</Text>
      {isSkills ? (
        <View style={styles.templateSkillGrid}>
          {section.lines.map((line) => (
            <Text key={line} style={styles.templateSkillItem}>
              {line}
            </Text>
          ))}
        </View>
      ) : (
        section.lines.map((line, index) => {
          const yearRow = splitYear(line);

          if (!isSummary && yearRow) {
            return (
              <View key={`${line}-${index}`} style={styles.templateRow}>
                <Text style={styles.templateRowLeft}>{yearRow.left}</Text>
                <Text style={styles.templateRowRight}>{yearRow.right}</Text>
              </View>
            );
          }

          return (
            <Text
              key={`${line}-${index}`}
              style={
                !isSummary && looksLikeHeading(line)
                  ? styles.templateBoldLine
                  : paragraphStyle
              }
            >
              {line}
            </Text>
          );
        })
      )}
    </View>
  );
}

export function ResumeDocument({ data }: { data: ResumePdfData }) {
  if (data.fullText?.trim()) {
    const parsed = parseResumeText(data.fullText);
    const template = data.template ?? "classic";
    const pageStyle =
      template === "modern"
        ? styles.modernPage
        : template === "compact"
          ? styles.compactPage
          : styles.templatePage;
    const contactStyle =
      template === "modern"
        ? styles.modernContacts
        : template === "compact"
          ? styles.compactContacts
          : styles.templateContacts;

    return (
      <Document title={`${data.name} - ${data.role} Resume`}>
        <Page size="A4" style={pageStyle}>
          <Text style={getNameStyle(parsed.name, template)}>{parsed.name}</Text>
          {parsed.contacts ? (
            <Text style={contactStyle}>{parsed.contacts}</Text>
          ) : null}
          {parsed.sections.map((section) => (
            <TemplateSection
              key={section.title}
              section={section}
              template={template}
            />
          ))}
        </Page>
      </Document>
    );
  }

  return (
    <Document title={`${data.name} - ${data.role} Resume`}>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.name}>{data.name}</Text>
          <Text style={styles.role}>{data.role}</Text>
          <Text>
            {[data.email, data.location].filter(Boolean).join(" | ")}
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Summary</Text>
          <Text style={styles.paragraph}>{data.summary}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <View style={styles.skillRow}>
            {data.skills.map((skill) => (
              <Text key={skill} style={styles.skill}>
                {skill}
              </Text>
            ))}
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Selected Experience</Text>
          {data.bullets.map((bullet) => (
            <Text key={bullet} style={styles.bullet}>
              - {bullet}
            </Text>
          ))}
        </View>
      </Page>
    </Document>
  );
}
