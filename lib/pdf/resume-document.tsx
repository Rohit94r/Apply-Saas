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
  templateName: {
    fontSize: 26,
    fontFamily: "Helvetica-Bold",
    textAlign: "center",
    letterSpacing: 0.6,
    marginBottom: 6
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
  "CERTIFICATIONS"
]);

type ParsedSection = {
  title: string;
  lines: string[];
};

function cleanLine(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function isSectionHeader(value: string) {
  return SECTION_HEADERS.has(cleanLine(value).toUpperCase());
}

function parseResumeText(value: string) {
  const lines = value
    .split(/\r?\n/)
    .map(cleanLine)
    .filter(Boolean);
  const firstSectionIndex = lines.findIndex(isSectionHeader);
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

function TemplateSection({ section }: { section: ParsedSection }) {
  const isSkills = section.title === "SKILLS";
  const isSummary = section.title === "SUMMARY";

  return (
    <View style={styles.templateSection}>
      <Text style={styles.templateSectionTitle}>{section.title}</Text>
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
                  : styles.templateParagraph
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

    return (
      <Document title={`${data.name} - ${data.role} Resume`}>
        <Page size="A4" style={styles.templatePage}>
          <Text style={styles.templateName}>{parsed.name}</Text>
          {parsed.contacts ? (
            <Text style={styles.templateContacts}>{parsed.contacts}</Text>
          ) : null}
          {parsed.sections.map((section) => (
            <TemplateSection key={section.title} section={section} />
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
