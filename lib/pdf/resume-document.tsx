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
  }
});

export function ResumeDocument({ data }: { data: ResumePdfData }) {
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
