// ... (rest of the code remains the same)

// Job type definitions
type JobType = "FULL_TIME" | "PART_TIME" | "CONTRACT" | "INTERNSHIP" | "REMOTE";
type ExperienceLevel = "ENTRY" | "MID" | "SENIOR" | "LEAD" | "EXECUTIVE";
type SalaryRange = "0-3000" | "3000-5000" | "5000-8000" | "8000-12000" | "12000+";

interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  type: JobType;
  salary: string;
  salaryMin: number;
  salaryMax: number;
  skills: string[];
  postedAt: string;
  postedDate: Date;
  isHot?: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
  views: number;
  applications: number;
  description?: string;
  requirements?: string[];
  benefits?: string[];
  companySize?: string;
  companyIndustry?: string;
  experienceLevel: ExperienceLevel;
  remote?: boolean;
}

interface FilterState {
  search: string;
  location: string;
  types: JobType[];
  experienceLevels: ExperienceLevel[];
  salaryRange: SalaryRange | null;
  skills: string[];
  remote: boolean;
  postedWithin: "any" | "24h" | "3d" | "7d" | "30d";
  sortBy: "relevance" | "newest" | "salary" | "views";
}

const jobTypes: { value: JobType; label: string; icon: any }[] = [
  { value: "FULL_TIME", label: "Full-time", icon: Briefcase },
  { value: "PART_TIME", label: "Part-time", icon: Clock },
  { value: "CONTRACT", label: "Contract", icon: Building2 },
  { value: "INTERNSHIP", label: "Internship", icon: GraduationCap },
  { value: "REMOTE", label: "Remote", icon: Globe },
];

const experienceLevels: { value: ExperienceLevel; label: string }[] = [
  { value: "ENTRY", label: "Entry Level" },
  { value: "MID", label: "Mid Level" },
  { value: "SENIOR", label: "Senior Level" },
  { value: "LEAD", label: "Lead" },
  { value: "EXECUTIVE", label: "Executive" },
];

const salaryRanges: { value: SalaryRange; label: string }[] = [
  { value: "0-3000", label: "$0 - $3,000" },
  { value: "3000-5000", label: "$3,000 - $5,000" },
  { value: "5000-8000", label: "$5,000 - $8,000" },
  { value: "8000-12000", label: "$8,000 - $12,000" },
  { value: "12000+", label: "$12,000+" },
];

const popularSkills = [
  "React", "TypeScript", "Node.js", "Python", "Java", "AWS", 
  "Docker", "Kubernetes", "SQL", "MongoDB", "GraphQL", "Next.js"
];

const locations = [
  "Tashkent", "Samarkand", "Bukhara", "Andijan", "Fergana", 
  "Namangan", "Kokand", "Nukus", "Urgench", "Termez", "Remote"
];

// Mock data generator
const generateJobs = (): Job[] => {
  const companies = [
    { name: "TechCorp Uzbekistan", size: "500+", industry: "Technology" },
    { name: "Digital Solutions", size: "50-200", industry: "IT Services" },
    { name: "Creative Studio", size: "10-50", industry: "Design" },
    { name: "DataSystems", size: "200-500", industry: "Data Analytics" },
    { name: "FinTech Hub", size: "100-500", industry: "Financial Services" },
    { name: "E-Commerce Pro", size: "1000+", industry: "E-Commerce" },
    { name: "CloudNative", size: "50-200", industry: "Cloud Computing" },
    { name: "AI Innovations", size: "20-100", industry: "Artificial Intelligence" },
  ];

  const jobTitles = [
    { title: "Senior Frontend Developer", level: "SENIOR" as ExperienceLevel, skills: ["React", "TypeScript", "Next.js"], salary: [5000, 8000] },
    { title: "Full Stack Engineer", level: "MID" as ExperienceLevel, skills: ["Node.js", "React", "MongoDB"], salary: [4000, 7000] },
    { title: "DevOps Engineer", level: "SENIOR" as ExperienceLevel, skills: ["AWS", "Docker", "Kubernetes"], salary: [6000, 9000] },
    { title: "Product Manager", level: "MID" as ExperienceLevel, skills: ["Agile", "Analytics", "Strategy"], salary: [5000, 8000] },
    { title: "UI/UX Designer", level: "MID" as ExperienceLevel, skills: ["Figma", "Adobe XD", "Prototyping"], salary: [3000, 6000] },
    { title: "Data Scientist", level: "SENIOR" as ExperienceLevel, skills: ["Python", "SQL", "Machine Learning"], salary: [6000, 10000] },
    { title: "Mobile Developer", level: "MID" as ExperienceLevel, skills: ["React Native", "iOS", "Android"], salary: [4000, 7000] },
    { title: "Backend Engineer", level: "SENIOR" as ExperienceLevel, skills: ["Java", "Spring", "PostgreSQL"], salary: [5500, 8500] },
    { title: "QA Engineer", level: "ENTRY" as ExperienceLevel, skills: ["Selenium", "Cypress", "Testing"], salary: [2000, 4000] },
    { title: "Marketing Manager", level: "MID" as ExperienceLevel, skills: ["Digital Marketing", "SEO", "Analytics"], salary: [3500, 6000] },
  ];

  const types: JobType[] = ["FULL_TIME", "PART_TIME", "CONTRACT", "INTERNSHIP", "REMOTE"];
  const cities = ["Tashkent", "Samarkand", "Bukhara", "Andijan", "Remote"];

  return Array.from({ length: 48 }, (_, i) => {
    const jobTemplate = jobTitles[i % jobTitles.length];
    const company = companies[i % companies.length];
    const city = cities[i % cities.length];
    const type = types[i % types.length];
    const postedDays = Math.floor(Math.random() * 30);
    
    return {
      id: String(i + 1),
      title: jobTemplate.title,
      company: company.name,
      companyLogo: `/companies/${company.name.toLowerCase().replace(/\s+/g, "-")}.png`,
      location: city,
      type,
      salary: `$${jobTemplate.salary[0].toLocaleString()} - $${jobTemplate.salary[1].toLocaleString()}`,
      salaryMin: jobTemplate.salary[0],
      salaryMax: jobTemplate.salary[1],
      skills: jobTemplate.skills,
      postedAt: postedDays === 0 ? "Today" : postedDays === 1 ? "Yesterday" : `${postedDays} days ago`,
      postedDate: new Date(Date.now() - postedDays * 24 * 60 * 60 * 1000),
      isHot: Math.random() > 0.7,
      isNew: postedDays <= 3,
      isFeatured: Math.random() > 0.85,
      views: Math.floor(Math.random() * 500) + 50,
      applications: Math.floor(Math.random() * 50) + 5,
      description: `Join our team as a ${jobTemplate.title} and help us build amazing products that impact millions of users.`,
      requirements: [
        `${jobTemplate.level.toLowerCase()} level experience`,
        "Strong problem-solving skills",
        "Excellent communication abilities",
      ],
      benefits: ["Competitive salary", "Health insurance", "Remote work options", "Professional development"],
      companySize: company.size,
      companyIndustry: company.industry,
      experienceLevel: jobTemplate.level,
      remote: type === "REMOTE" || Math.random() > 0.6,
    };
  });
};

export default function JobsListingPage() {
  const [jobs] = useState<Job[]>(generateJobs());
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(jobs);
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    location: "",
    types: [],
    experienceLevels: [],
    salaryRange: null,
    skills: [],
    remote: false,
    postedWithin: "any",
    sortBy: "relevance",
  });
  const [savedJobs, setSavedJobs] = useState<string[]>([]);
  const [comparedJobs, setComparedJobs] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 12;

  // Apply filters
  useEffect(() => {
    let result = [...jobs];

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        (job) =>
          job.title.toLowerCase().includes(searchLower) ||
          job.company.toLowerCase().includes(searchLower) ||
          job.skills.some((skill) => skill.toLowerCase().includes(searchLower))
      );
    }

    // Location filter
    if (filters.location) {
      result = result.filter((job) =>
        job.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Type filter
    if (filters.types.length > 0) {
      result = result.filter((job) => filters.types.includes(job.type));
    }

    // Experience level filter
    if (filters.experienceLevels.length > 0) {
      result = result.filter((job) =>
        filters.experienceLevels.includes(job.experienceLevel)
      );
    }

    // Salary range filter
    if (filters.salaryRange) {
      const [min, max] = filters.salaryRange.split("-").map((v) =>
        v.endsWith("+") ? Infinity : parseInt(v)
      );
      result = result.filter((job) =>
        max === Infinity ? job.salaryMax >= min : job.salaryMin <= max && job.salaryMax >= min
      );
    }

    // Skills filter
    if (filters.skills.length > 0) {
      result = result.filter((job) =>
        filters.skills.some((skill) =>
          job.skills.some((jobSkill) =>
            jobSkill.toLowerCase().includes(skill.toLowerCase())
          )
        )
      );
    }

    // Remote filter
    if (filters.remote) {
      result = result.filter((job) => job.remote);
    }

    // Posted within filter
    if (filters.postedWithin !== "any") {
      const days = {
        "24h": 1,
        "3d": 3,
        "7d": 7,
        "30d": 30,
      }[filters.postedWithin];
      const cutoff = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
      result = result.filter((job) => job.postedDate >= cutoff);
    }

    // Sort
    switch (filters.sortBy) {
      case "newest":
        result.sort((a, b) => b.postedDate.getTime() - a.postedDate.getTime());
        break;
      case "salary":
        result.sort((a, b) => b.salaryMax - a.salaryMax);
        break;
      case "views":
        result.sort((a, b) => b.views - a.views);
        break;
      default:
        // Relevance - featured jobs first, then by views
        result.sort((a, b) => {
          if (a.isFeatured && !b.isFeatured) return -1;
          if (!a.isFeatured && b.isFeatured) return 1;
          return b.views - a.views;
        });
    }

    setFilteredJobs(result);
    setCurrentPage(1);
  }, [filters, jobs]);

  const toggleSaveJob = (jobId: string) => {
    setSavedJobs((prev) =>
      prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId]
    );
  };

  const toggleCompareJob = (jobId: string) => {
    setComparedJobs((prev) => {
      if (prev.includes(jobId)) {
        return prev.filter((id) => id !== jobId);
      }
      if (prev.length >= 3) {
        return prev;
      }
      return [...prev, jobId];
    });
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      location: "",
      types: [],
      experienceLevels: [],
      salaryRange: null,
      skills: [],
      remote: false,
      postedWithin: "any",
      sortBy: "relevance",
    });
  };

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * jobsPerPage,
    currentPage * jobsPerPage
  );

  const activeFiltersCount =
    (filters.search ? 1 : 0) +
    (filters.location ? 1 : 0) +
    filters.types.length +
    filters.experienceLevels.length +
    (filters.salaryRange ? 1 : 0) +
    filters.skills.length +
    (filters.remote ? 1 : 0) +
    (filters.postedWithin !== "any" ? 1 : 0);

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="bg-background border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold">Explore Jobs</h1>
              <p className="text-muted-foreground">
                {filteredJobs.length.toLocaleString()} jobs available
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
                {activeFiltersCount > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>
              <div className="flex items-center border rounded-lg p-1">
                <Button
                  variant={viewMode === "grid" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search by job title, company, or keywords..."
                className="pl-10"
                value={filters.search}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, search: e.target.value }))
                }
              />
            </div>
            <div className="relative md:w-64">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Location"
                className="pl-10"
                value={filters.location}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, location: e.target.value }))
                }
              />
            </div>
            <Button className="md:w-auto">
              <Search className="w-4 h-4 mr-2" />
              Search Jobs
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Sparkles className="w-4 h-4 text-yellow-500" />
              <span>{jobs.filter((j) => j.isFeatured).length} Featured</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Zap className="w-4 h-4 text-orange-500" />
              <span>{jobs.filter((j) => j.isHot).length} Hot</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4 text-blue-500" />
              <span>{jobs.filter((j) => j.isNew).length} New</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Globe className="w-4 h-4 text-green-500" />
              <span>{jobs.filter((j) => j.remote).length} Remote</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Filters Sidebar */}
          <AnimatePresence>
            {(showFilters || typeof window !== "undefined" && window.innerWidth >= 1024) && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className={cn(
                  "lg:w-72 flex-shrink-0",
                  !showFilters && "hidden lg:block"
                )}
              >
                <div className="space-y-6">
                  {/* Active Filters */}
                  {activeFiltersCount > 0 && (
                    <div className="bg-background rounded-lg border p-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-semibold">Active Filters</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={clearFilters}
                          className="h-auto py-1 px-2"
                        >
                          <RotateCcw className="w-3 h-3 mr-1" />
                          Clear all
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {filters.search && (
                          <Badge variant="secondary" className="cursor-pointer" onClick={() => setFilters((prev) => ({ ...prev, search: "" }))}>
                            Search: {filters.search} <X className="w-3 h-3 ml-1" />
                          </Badge>
                        )}
                        {filters.location && (
                          <Badge variant="secondary" className="cursor-pointer" onClick={() => setFilters((prev) => ({ ...prev, location: "" }))}>
                            {filters.location} <X className="w-3 h-3 ml-1" />
                          </Badge>
                        )}
                        {filters.types.map((type) => (
                          <Badge key={type} variant="secondary" className="cursor-pointer" onClick={() => setFilters((prev) => ({ ...prev, types: prev.types.filter((t) => t !== type) }))}>
                            {type.replace("_", " ")} <X className="w-3 h-3 ml-1" />
                          </Badge>
                        ))}
                        {filters.skills.map((skill) => (
                          <Badge key={skill} variant="secondary" className="cursor-pointer" onClick={() => setFilters((prev) => ({ ...prev, skills: prev.skills.filter((s) => s !== skill) }))}>
                            {skill} <X className="w-3 h-3 ml-1" />
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Job Type Filter */}
                  <div className="bg-background rounded-lg border p-4">
                    <h3 className="font-semibold mb-3">Job Type</h3>
                    <div className="space-y-2">
                      {jobTypes.map((type) => (
                        <label
                          key={type.value}
                          className="flex items-center gap-3 cursor-pointer hover:bg-muted/50 p-2 rounded-lg transition-colors"
                        >
                          <input
                            type="checkbox"
                            checked={filters.types.includes(type.value)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setFilters((prev) => ({
                                  ...prev,
                                  types: [...prev.types, type.value],
                                }));
                              } else {
                                setFilters((prev) => ({
                                  ...prev,
                                  types: prev.types.filter((t) => t !== type.value),
                                }));
                              }
                            }}
                            className="rounded border-gray-300"
                          />
                          <type.icon className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">{type.label}</span>
                          <span className="text-xs text-muted-foreground ml-auto">
                            {jobs.filter((j) => j.type === type.value).length}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Experience Level Filter */}
                  <div className="bg-background rounded-lg border p-4">
                    <h3 className="font-semibold mb-3">Experience Level</h3>
                    <div className="space-y-2">
                      {experienceLevels.map((level) => (
                        <label
                          key={level.value}
                          className="flex items-center gap-3 cursor-pointer hover:bg-muted/50 p-2 rounded-lg transition-colors"
                        >
                          <input
                            type="checkbox"
                            checked={filters.experienceLevels.includes(level.value)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setFilters((prev) => ({
                                  ...prev,
                                  experienceLevels: [...prev.experienceLevels, level.value],
                                }));
                              } else {
                                setFilters((prev) => ({
                                  ...prev,
                                  experienceLevels: prev.experienceLevels.filter(
                                    (l) => l !== level.value
                                  ),
                                }));
                              }
                            }}
                            className="rounded border-gray-300"
                          />
                          <span className="text-sm">{level.label}</span>
                          <span className="text-xs text-muted-foreground ml-auto">
                            {jobs.filter((j) => j.experienceLevel === level.value).length}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Salary Range Filter */}
                  <div className="bg-background rounded-lg border p-4">
                    <h3 className="font-semibold mb-3">Salary Range</h3>
                    <div className="space-y-2">
                      {salaryRanges.map((range) => (
                        <label
                          key={range.value}
                          className="flex items-center gap-3 cursor-pointer hover:bg-muted/50 p-2 rounded-lg transition-colors"
                        >
                          <input
                            type="radio"
                            name="salary"
                            checked={filters.salaryRange === range.value}
                            onChange={() =>
                              setFilters((prev) => ({ ...prev, salaryRange: range.value }))
                            }
                            className="rounded-full border-gray-300"
                          />
                          <span className="text-sm">{range.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Skills Filter */}
                  <div className="bg-background rounded-lg border p-4">
                    <h3 className="font-semibold mb-3">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {popularSkills.map((skill) => (
                        <Badge
                          key={skill}
                          variant={filters.skills.includes(skill) ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => {
                            if (filters.skills.includes(skill)) {
                              setFilters((prev) => ({
                                ...prev,
                                skills: prev.skills.filter((s) => s !== skill),
                              }));
                            } else {
                              setFilters((prev) => ({
                                ...prev,
                                skills: [...prev.skills, skill],
                              }));
                            }
                          }}
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Remote Filter */}
                  <div className="bg-background rounded-lg border p-4">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.remote}
                        onChange={(e) =>
                          setFilters((prev) => ({ ...prev, remote: e.target.checked }))
                        }
                        className="rounded border-gray-300"
                      />
                      <Globe className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">Remote only</span>
                    </label>
                  </div>

                  {/* Posted Within Filter */}
                  <div className="bg-background rounded-lg border p-4">
                    <h3 className="font-semibold mb-3">Posted Within</h3>
                    <select
                      value={filters.postedWithin}
                      onChange={(e) =>
                        setFilters((prev) => ({
                          ...prev,
                          postedWithin: e.target.value as any,
                        }))
                      }
                      className="w-full p-2 rounded-lg border bg-background"
                    >
                      <option value="any">Any time</option>
                      <option value="24h">Last 24 hours</option>
                      <option value="3d">Last 3 days</option>
                      <option value="7d">Last 7 days</option>
                      <option value="30d">Last 30 days</option>
                    </select>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Content */}
          <div className="flex-1">
            {/* Sort and Results Info */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <p className="text-muted-foreground">
                Showing {(currentPage - 1) * jobsPerPage + 1} -{" "}
                {Math.min(currentPage * jobsPerPage, filteredJobs.length)} of{" "}
                {filteredJobs.length} results
              </p>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Sort by:</span>
                <select
                  value={filters.sortBy}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, sortBy: e.target.value as any }))
                  }
                  className="p-2 rounded-lg border bg-background text-sm"
                >
                  <option value="relevance">Relevance</option>
                  <option value="newest">Newest</option>
                  <option value="salary">Salary (High to Low)</option>
                  <option value="views">Most Viewed</option>
                </select>
              </div>
            </div>

            {/* Compare Bar */}
            {comparedJobs.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-primary text-white rounded-lg p-4 mb-6 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <BarChart3 className="w-5 h-5" />
                  <span>
                    {comparedJobs.length} job{comparedJobs.length > 1 ? "s" : ""} selected for comparison
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="secondary" size="sm">
                    Compare Now
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setComparedJobs([])}
                    className="text-white hover:text-white hover:bg-white/20"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Jobs Grid/List */}
            {paginatedJobs.length > 0 ? (
              <div
                className={cn(
                  "grid gap-4",
                  viewMode === "grid"
                    ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
                    : "grid-cols-1"
                )}
              >
                {paginatedJobs.map((job, index) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card
                      className={cn(
                        "group hover:shadow-lg transition-all duration-300 overflow-hidden",
                        job.isFeatured && "border-primary/50 ring-1 ring-primary/20",
                        viewMode === "list" && "flex flex-row"
                      )}
                    >
                      <div
                        className={cn(
                          "bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center relative",
                          viewMode === "grid" ? "h-32" : "w-32 min-w-[128px]"
                        )}
                      >
                        <Building2 className="w-12 h-12 text-primary/40" />
                        {job.isFeatured && (
                          <div className="absolute top-2 right-2">
                            <Badge className="bg-primary text-white">
                              <Star className="w-3 h-3 mr-1" />
                              Featured
                            </Badge>
                          </div>
                        )}
                        {job.isHot && (
                          <div className="absolute top-2 left-2">
                            <Badge variant="destructive">
                              <Zap className="w-3 h-3 mr-1" />
                              Hot
                            </Badge>
                          </div>
                        )}
                        {job.isNew && (
                          <div
                            className={cn(
                              "absolute",
                              viewMode === "grid"
                                ? job.isFeatured || job.isHot
                                  ? "bottom-2 left-2"
                                  : "top-2 left-2"
                                : "bottom-2 left-2"
                            )}
                          >
                            <Badge variant="secondary" className="text-xs">
                              New
                            </Badge>
                          </div>
                        )}
                      </div>

                      <CardContent className={cn("p-4", viewMode === "list" && "flex-1")}>
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className="flex-1 min-w-0">
                            <Link href={`/jobs/${job.id}`}>
                              <h3 className="font-semibold text-lg truncate hover:text-primary transition-colors cursor-pointer">
                                {job.title}
                              </h3>
                            </Link>
                            <p className="text-muted-foreground text-sm">{job.company}</p>
                          </div>
                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleSaveJob(job.id)}
                              className={cn(
                                "h-8 w-8 p-0",
                                savedJobs.includes(job.id) && "text-red-500"
                              )}
                            >
                              <Heart
                                className={cn(
                                  "w-4 h-4",
                                  savedJobs.includes(job.id) && "fill-current"
                                )}
                              />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleCompareJob(job.id)}
                              disabled={!comparedJobs.includes(job.id) && comparedJobs.length >= 3}
                              className={cn(
                                "h-8 w-8 p-0",
                                comparedJobs.includes(job.id) && "text-primary"
                              )}
                            >
                              <BarChart3 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-3">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {job.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />
                            {job.salary}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {job.postedAt}
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-1 mb-4">
                          {job.skills.slice(0, 3).map((skill) => (
                            <Badge key={skill} variant="secondary" className="text-xs">
                          {job.skills.map((skill) => (
                            <Badge key={skill} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-primary mb-2">{job.salary}</p>
                        <Button size="sm">Ariza topshirish</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </TabsContent>

          <TabsContent value="hot">
            <div className="space-y-4">
              {filteredJobs
                .filter((job) => job.isHot)
                .map((job, index) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card>
                      <CardContent className="p-6">
                        <h3 className="text-lg font-semibold">{job.title}</h3>
                        <p className="text-muted-foreground">{job.company}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="new">
            <div className="space-y-4">
              {filteredJobs
                .filter((job) => job.isNew)
                .map((job, index) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card>
                      <CardContent className="p-6">
                        <h3 className="text-lg font-semibold">{job.title}</h3>
                        <p className="text-muted-foreground">{job.company}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
