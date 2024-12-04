import bcrypt from 'bcrypt';
import { UserModel, E_Role } from './models/user';
import { LocationModel } from './models/location';
import { JobTypeModel } from './models/job-type';
import { JobCategoryModel } from './models/job-category';
import { JobModel } from './models/job';
import { CompanyModel } from './models/company';
import { CandidateProfileModel } from './models/candidate-profile';
import { ApplicationModel, E_ApplicationStatus } from './models/application';

async function hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

export async function seedData() {
    const locations = await LocationModel.insertMany([
        {
            address: '123 Đường ABC',
            city: 'Hồ Chí Minh',
            country: 'Việt Nam',
        },
        {
            address: '123 Đường XYZ',
            city: 'Hà Nội',
            country: 'Việt Nam',
        },
        {
            address: '123 Đường DEF',
            city: 'Đà Nẵng',
            country: 'Việt Nam',
        },
        {
            address: '123 Đường GHI',
            city: 'Hải Phòng',
            country: 'Việt Nam',
        },
        {
            address: '123 Đường KLM',
            city: 'Cần Thơ',
            country: 'Việt Nam',
        },
        {
            address: '123 Đường NOP',
            city: 'Hải Dương',
            country: 'Việt Nam',
        },
        {
            address: '123 Đường QRS',
            city: 'Quảng Ninh',
            country: 'Việt Nam',
        },
    ]);

    const jobTypes = await JobTypeModel.insertMany([
        { type: 'Toàn thời gian' },
        { type: 'Bán thời gian' },
        { type: 'Thực tập' },
        { type: 'Hợp đồng' },
        { type: 'Thời vụ' },
    ]);

    const jobCategories = await JobCategoryModel.insertMany([
        { name: 'Công nghệ thông tin' },
        { name: 'Kế toán' },
        { name: 'Nhân sự' },
        { name: 'Marketing' },
        { name: 'Bán hàng' },
        { name: 'Thiết kế' },
        { name: 'Sản xuất' },
    ]);

    const companies = await CompanyModel.insertMany([
        {
            name: 'Công ty XYZ',
            description: 'Công ty hàng đầu về công nghệ.',
            size: 100,
            field: 'Công nghệ',
            locationId: locations[0]._id,
            isDel: false,
        },
        {
            name: 'Công ty ABC',
            description: 'Công ty chuyên về phần mềm.',
            size: 150,
            field: 'Phần mềm',
            locationId: locations[1]._id,
            isDel: false,
        },
        {
            name: 'Công ty DEF',
            description: 'Công ty chuyên về tài chính.',
            size: 200,
            field: 'Tài chính',
            locationId: locations[2]._id,
            isDel: false,
        },
        {
            name: 'Công ty GHI',
            description: 'Công ty hàng đầu về dịch vụ.',
            size: 300,
            field: 'Dịch vụ',
            locationId: locations[3]._id,
            isDel: false,
        },
        {
            name: 'Công ty JKL',
            description: 'Công ty chuyên về sản xuất.',
            size: 500,
            field: 'Sản xuất',
            locationId: locations[4]._id,
            isDel: false,
        },
        {
            name: 'Công ty MNO',
            description: 'Công ty hàng đầu về thương mại.',
            size: 1000,
            field: 'Thương mại',
            locationId: locations[5]._id,
            isDel: false,
        },
    ]);

    // Thêm hồ sơ ứng viên (mỗi ứng viên sẽ có 1 hồ sơ)
    const candidateProfiles = await CandidateProfileModel.insertMany([
        {
            resume: {
                cvLinks: ['/uploads/[candidate1@example.com]-cyber.pdf'],
                skills: [
                    { name: 'JavaScript', experience: 3 },
                    { name: 'Node.js', experience: 2 },
                ],
            },
            isDel: false,
        },
        {
            resume: {
                cvLinks: ['/uploads/[candidate2@example.com]-cyber.pdf'],
                skills: [
                    { name: 'Python', experience: 4 },
                    { name: 'Django', experience: 3 },
                ],
            },
            isDel: false,
        },
        {
            resume: {
                cvLinks: ['/uploads/[candidate3@example.com]-cyber.pdf'],
                skills: [
                    { name: 'React', experience: 2 },
                    { name: 'Next.js', experience: 1 },
                ],
            },
            isDel: false,
        },
        {
            resume: {
                cvLinks: ['/uploads/[candidate4@example.com]-cyber.pdf'],
                skills: [
                    { name: 'C#', experience: 4 },
                    { name: '.NET', experience: 3 },
                ],
            },
            isDel: false,
        },
        {
            resume: {
                cvLinks: ['/uploads/[candidate5@example.com]-cyber.pdf'],
                skills: [
                    { name: 'PHP', experience: 3 },
                    { name: 'Laravel', experience: 2 },
                ],
            },
            isDel: false,
        },
    ]);

    // Tạo mật khẩu đã băm
    const hashedPassword = await hashPassword('123123');
    const users = await UserModel.insertMany([
        {
            email: 'admin@example.com',
            password: hashedPassword,
            fullName: 'Duy',
            role: E_Role.ADMIN,
        },
        {
            email: 'candidate1@example.com',
            password: hashedPassword,
            fullName: 'Nguyễn Văn A',
            role: E_Role.CANDIDATE,
            candidateId: candidateProfiles[0]._id,
            companyId: null,
        },
        {
            email: 'candidate2@example.com',
            password: hashedPassword,
            fullName: 'Trần Văn B',
            role: E_Role.CANDIDATE,
            candidateId: candidateProfiles[1]._id,
            companyId: null,
        },
        {
            email: 'candidate3@example.com',
            password: hashedPassword,
            fullName: 'Lê Thị C',
            role: E_Role.CANDIDATE,
            candidateId: candidateProfiles[2]._id,
            companyId: null,
        },
        {
            email: 'candidate4@example.com',
            password: hashedPassword,
            fullName: 'Phạm Văn D',
            role: E_Role.CANDIDATE,
            candidateId: candidateProfiles[3]._id,
            companyId: null,
        },
        {
            email: 'candidate5@example.com',
            password: hashedPassword,
            fullName: 'Nguyễn Thị E',
            role: E_Role.CANDIDATE,
            candidateId: candidateProfiles[4]._id,
            companyId: null,
        },
        {
            email: 'recruiter1@example.com',
            password: hashedPassword,
            fullName: 'Trần Thị F',
            role: E_Role.RECRUITER,
            candidateId: null,
            companyId: companies[0]._id,
        },
        {
            email: 'recruiter2@example.com',
            password: hashedPassword,
            fullName: 'Nguyễn Văn G',
            role: E_Role.RECRUITER,
            candidateId: null,
            companyId: companies[1]._id,
        },
        {
            email: 'recruiter3@example.com',
            password: hashedPassword,
            fullName: 'Lê Thị H',
            role: E_Role.RECRUITER,
            candidateId: null,
            companyId: companies[2]._id,
        },
        {
            email: 'recruiter4@example.com',
            password: hashedPassword,
            fullName: 'Phạm Văn K',
            role: E_Role.RECRUITER,
            candidateId: null,
            companyId: companies[3]._id,
        },
        {
            email: 'recruiter5@example.com',
            password: hashedPassword,
            fullName: 'Trần Thị M',
            role: E_Role.RECRUITER,
            candidateId: null,
            companyId: companies[4]._id,
        },
    ]);

    const jobs = await JobModel.insertMany([
        {
            title: 'Lập trình viên Full Stack',
            description: `
        <div>
          <h3>Mô Tả Công Việc</h3>
          <ul>
            <li>Phát triển và duy trì các ứng dụng web toàn diện từ giao diện người dùng đến backend</li>
            <li>Thiết kế và triển khai các API RESTful hiệu quả</li>
            <li>Tối ưu hóa hiệu suất và trải nghiệm người dùng của ứng dụng</li>
          </ul>

          <h3>Yêu Cầu</h3>
          <ul>
            <li>Tối thiểu 2 năm kinh nghiệm phát triển Full Stack</li>
            <li>Thành thạo React, Node.js, MongoDB</li>
            <li>Có kiến thức vững về các nguyên tắc thiết kế web responsive</li>
            <li>Khả năng làm việc nhóm và giao tiếp tốt</li>
          </ul>

          <h3>Ưu Tiên</h3>
          <ul>
            <li>Kinh nghiệm với các framework như Next.js, Express.js</li>
            <li>Có dự án cá nhân hoặc open source</li>
            <li>Chứng chỉ chuyên môn về phát triển web</li>
          </ul>
        </div>
      `,
            salary: 15000000,
            experience: 2,
            deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            createdAt: new Date(),
            updatedAt: new Date(),
            headcount: 5,
            companyId: companies[0]._id,
            jobTypeId: jobTypes[0]._id,
            categoryId: jobCategories[0]._id,
            locationId: locations[0]._id,
            isDel: false,
        },
        {
            title: 'DevOps Engineer',
            description: `
            <div>
              <h3>Trách Nhiệm Chính</h3>
              <ul>
                <li>Thiết kế và quản lý hạ tầng đám mây</li>
                <li>Phát triển và duy trì pipeline CI/CD</li>
                <li>Giám sát và tối ưu hóa hiệu suất hệ thống</li>
                <li>Đảm bảo an ninh và tính sẵn sàng của hệ thống</li>
              </ul>
    
              <h3>Kỹ Năng Yêu Cầu</h3>
              <ul>
                <li>Kinh nghiệm 3+ năm về DevOps</li>
                <li>Thành thạo Docker và Kubernetes</li>
                <li>Kiến thức sâu về AWS, Google Cloud hoặc Azure</li>
                <li>Kỹ năng tự động hóa với Ansible, Terraform</li>
              </ul>
    
              <h3>Điểm Cộng</h3>
              <ul>
                <li>Chứng chỉ chuyên sâu về đám mây</li>
                <li>Kinh nghiệm với microservices</li>
                <li>Hiểu biết về môi trường container</li>
              </ul>
            </div>
          `,
            salary: 17000000,
            experience: 3,
            deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            createdAt: new Date(),
            updatedAt: new Date(),
            headcount: 2,
            companyId: companies[0]._id,
            jobTypeId: jobTypes[0]._id,
            categoryId: jobCategories[0]._id,
            locationId: locations[0]._id,
            isDel: false,
        },
        {
            title: 'UI/UX Designer',
            description: `
        <div>
          <h3>Trách Nhiệm Chính</h3>
          <ul>
            <li>Thiết kế giao diện và trải nghiệm người dùng cho các ứng dụng web và di động</li>
            <li>Nghiên cứu hành vi người dùng để tối ưu hóa trải nghiệm</li>
            <li>Phối hợp với đội phát triển để triển khai thiết kế</li>
            <li>Tạo wireframes, prototypes và mockups trực quan</li>
          </ul>

          <h3>Kỹ Năng Yêu Cầu</h3>
          <ul>
            <li>2+ năm kinh nghiệm trong thiết kế UI/UX</li>
            <li>Thành thạo các công cụ như Figma, Sketch, Adobe XD</li>
            <li>Kiến thức cơ bản về HTML, CSS</li>
            <li>Kỹ năng giao tiếp và làm việc nhóm tốt</li>
          </ul>

          <h3>Ưu Tiên</h3>
          <ul>
            <li>Kinh nghiệm trong thiết kế ứng dụng di động</li>
            <li>Hiểu biết về hệ thống thiết kế (Design System)</li>
            <li>Chứng chỉ liên quan đến thiết kế UI/UX</li>
          </ul>
        </div>
    `,
            salary: 12000000,
            experience: 1,
            deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            createdAt: new Date(),
            updatedAt: new Date(),
            headcount: 3,
            companyId: companies[1]._id,
            jobTypeId: jobTypes[1]._id,
            categoryId: jobCategories[1]._id,
            locationId: locations[1]._id,
            isDel: false,
        },
        {
            title: 'Data Scientist',
            description: `
        <div>
          <h3>Mô Tả Công Việc</h3>
          <ul>
            <li>Phân tích và xử lý dữ liệu lớn</li>
            <li>Phát triển các mô hình Machine Learning để giải quyết vấn đề kinh doanh</li>
            <li>Trực quan hóa dữ liệu để báo cáo và thuyết phục</li>
            <li>Làm việc với đội ngũ kỹ thuật để tích hợp mô hình vào hệ thống</li>
          </ul>

          <h3>Kỹ Năng Yêu Cầu</h3>
          <ul>
            <li>3+ năm kinh nghiệm làm việc với dữ liệu</li>
            <li>Thành thạo Python, R và các thư viện như Pandas, NumPy</li>
            <li>Kỹ năng làm việc với SQL và NoSQL</li>
            <li>Kiến thức sâu về các thuật toán Machine Learning</li>
          </ul>

          <h3>Ưu Tiên</h3>
          <ul>
            <li>Hiểu biết về Big Data (Hadoop, Spark)</li>
            <li>Kinh nghiệm trong lĩnh vực phân tích tài chính hoặc marketing</li>
            <li>Chứng chỉ Data Science hoặc AI</li>
          </ul>
        </div>
    `,
            salary: 14000000,
            experience: 2,
            deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            createdAt: new Date(),
            updatedAt: new Date(),
            headcount: 4,
            companyId: companies[1]._id,
            jobTypeId: jobTypes[1]._id,
            categoryId: jobCategories[2]._id,
            locationId: locations[1]._id,
            isDel: false,
        },
        {
            title: 'Chuyên viên dịch vụ khách hàng',
            description: `
                <div>
                  <h3>Mô Tả Công Việc</h3>
                  <ul>
                    <li>Cung cấp thông tin và giải đáp thắc mắc của khách hàng</li>
                    <li>Tiếp nhận và xử lý khiếu nại, đảm bảo sự hài lòng của khách hàng</li>
                    <li>Thực hiện các cuộc gọi hỗ trợ và khảo sát mức độ hài lòng</li>
                    <li>Phối hợp với các phòng ban để giải quyết vấn đề của khách hàng</li>
                  </ul>
        
                  <h3>Yêu Cầu</h3>
                  <ul>
                    <li>Tối thiểu 2 năm kinh nghiệm trong lĩnh vực dịch vụ khách hàng</li>
                    <li>Kỹ năng giao tiếp và xử lý tình huống tốt</li>
                    <li>Thành thạo sử dụng các công cụ CRM</li>
                  </ul>
        
                  <h3>Ưu Tiên</h3>
                  <ul>
                    <li>Kinh nghiệm làm việc trong ngành bán lẻ hoặc tài chính</li>
                    <li>Kỹ năng nói và viết bằng tiếng Anh</li>
                  </ul>
                </div>
            `,
            salary: 13000000,
            experience: 2,
            deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            createdAt: new Date(),
            updatedAt: new Date(),
            headcount: 3,
            companyId: companies[2]._id,
            jobTypeId: jobTypes[2]._id,
            categoryId: jobCategories[3]._id,
            locationId: locations[2]._id,
            isDel: false,
        },
        {
            title: 'Quản lý dự án',
            description: `
                <div>
                  <h3>Trách Nhiệm Chính</h3>
                  <ul>
                    <li>Quản lý toàn bộ vòng đời của dự án từ lập kế hoạch đến triển khai</li>
                    <li>Điều phối các nguồn lực để đạt được mục tiêu của dự án</li>
                    <li>Giám sát tiến độ và đảm bảo các dự án hoàn thành đúng thời hạn</li>
                    <li>Xây dựng báo cáo tiến độ và báo cáo tài chính của dự án</li>
                  </ul>
        
                  <h3>Kỹ Năng Yêu Cầu</h3>
                  <ul>
                    <li>5+ năm kinh nghiệm quản lý dự án</li>
                    <li>Thành thạo các công cụ quản lý dự án như Trello, Jira</li>
                    <li>Kỹ năng lãnh đạo và giao tiếp xuất sắc</li>
                  </ul>
        
                  <h3>Ưu Tiên</h3>
                  <ul>
                    <li>Chứng chỉ PMP hoặc tương đương</li>
                    <li>Kinh nghiệm trong lĩnh vực tài chính hoặc công nghệ</li>
                  </ul>
                </div>
            `,
            salary: 20000000,
            experience: 5,
            deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            createdAt: new Date(),
            updatedAt: new Date(),
            headcount: 2,
            companyId: companies[2]._id,
            jobTypeId: jobTypes[2]._id,
            categoryId: jobCategories[2]._id,
            locationId: locations[2]._id,
            isDel: false,
        },
        {
            title: 'Quản đốc sản xuất',
            description: `
                <div>
                  <h3>Mô Tả Công Việc</h3>
                  <ul>
                    <li>Giám sát quy trình sản xuất và đảm bảo chất lượng sản phẩm</li>
                    <li>Lên kế hoạch sản xuất, quản lý nguồn lực và nguyên liệu</li>
                    <li>Đảm bảo an toàn lao động trong nhà máy</li>
                    <li>Phân tích hiệu suất và đề xuất các giải pháp cải tiến</li>
                  </ul>
        
                  <h3>Yêu Cầu</h3>
                  <ul>
                    <li>4+ năm kinh nghiệm trong quản lý sản xuất</li>
                    <li>Kỹ năng tổ chức và quản lý đội nhóm</li>
                    <li>Am hiểu về các tiêu chuẩn chất lượng và quy định an toàn</li>
                  </ul>
        
                  <h3>Ưu Tiên</h3>
                  <ul>
                    <li>Kinh nghiệm với các hệ thống ERP</li>
                    <li>Chứng chỉ quản lý sản xuất</li>
                  </ul>
                </div>
            `,
            salary: 18000000,
            experience: 4,
            deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            createdAt: new Date(),
            updatedAt: new Date(),
            headcount: 6,
            companyId: companies[3]._id,
            jobTypeId: jobTypes[0]._id,
            categoryId: jobCategories[4]._id,
            locationId: locations[3]._id,
            isDel: false,
        },
        {
            title: 'Nhân viên kho vận',
            description: `
                <div>
                  <h3>Trách Nhiệm Chính</h3>
                  <ul>
                    <li>Quản lý kho hàng và sắp xếp hàng hóa</li>
                    <li>Kiểm tra và cập nhật số lượng hàng tồn kho</li>
                    <li>Phối hợp với đội vận chuyển để đảm bảo giao hàng đúng hạn</li>
                    <li>Đảm bảo kho luôn tuân thủ các quy định về an toàn</li>
                  </ul>
        
                  <h3>Kỹ Năng Yêu Cầu</h3>
                  <ul>
                    <li>Tối thiểu 1 năm kinh nghiệm trong quản lý kho</li>
                    <li>Hiểu biết về các phần mềm quản lý kho</li>
                    <li>Kỹ năng tổ chức và làm việc nhóm</li>
                  </ul>
        
                  <h3>Ưu Tiên</h3>
                  <ul>
                    <li>Kinh nghiệm trong lĩnh vực logistics</li>
                    <li>Chứng chỉ về quản lý kho</li>
                  </ul>
                </div>
            `,
            salary: 11000000,
            experience: 1,
            deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            createdAt: new Date(),
            updatedAt: new Date(),
            headcount: 10,
            companyId: companies[3]._id,
            jobTypeId: jobTypes[0]._id,
            categoryId: jobCategories[4]._id,
            locationId: locations[3]._id,
            isDel: false,
        },
        {
            title: 'Trưởng nhóm bán hàng',
            description: `
                <div>
                  <h3>Mô Tả Công Việc</h3>
                  <ul>
                    <li>Quản lý và đào tạo đội ngũ bán hàng để đạt được mục tiêu kinh doanh</li>
                    <li>Lên kế hoạch bán hàng và theo dõi tiến độ thực hiện</li>
                    <li>Phân tích hiệu suất bán hàng và báo cáo định kỳ</li>
                    <li>Phát triển chiến lược thu hút và duy trì khách hàng</li>
                  </ul>
        
                  <h3>Yêu Cầu</h3>
                  <ul>
                    <li>Tối thiểu 3 năm kinh nghiệm trong quản lý đội ngũ bán hàng</li>
                    <li>Kỹ năng lãnh đạo, giao tiếp và đàm phán tốt</li>
                    <li>Khả năng phân tích dữ liệu và lập kế hoạch chiến lược</li>
                  </ul>
        
                  <h3>Ưu Tiên</h3>
                  <ul>
                    <li>Kinh nghiệm trong ngành FMCG hoặc bán lẻ</li>
                    <li>Thành thạo sử dụng các công cụ CRM</li>
                  </ul>
                </div>
            `,
            salary: 15000000,
            experience: 3,
            deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            createdAt: new Date(),
            updatedAt: new Date(),
            headcount: 5,
            companyId: companies[4]._id,
            jobTypeId: jobTypes[1]._id,
            categoryId: jobCategories[5]._id,
            locationId: locations[4]._id,
            isDel: false,
        },
        {
            title: 'Nhân viên tiếp thị',
            description: `
                <div>
                  <h3>Mô Tả Công Việc</h3>
                  <ul>
                    <li>Lên kế hoạch và triển khai các chiến dịch tiếp thị đa kênh</li>
                    <li>Quản lý nội dung trên các nền tảng truyền thông</li>
                    <li>Đánh giá hiệu quả của các chiến dịch và đưa ra cải tiến</li>
                    <li>Xây dựng mối quan hệ với các đối tác và khách hàng</li>
                  </ul>
        
                  <h3>Yêu Cầu</h3>
                  <ul>
                    <li>2+ năm kinh nghiệm trong lĩnh vực tiếp thị hoặc truyền thông</li>
                    <li>Kỹ năng sáng tạo nội dung và phân tích dữ liệu tốt</li>
                    <li>Hiểu biết về các công cụ tiếp thị số như Google Ads, Facebook Ads</li>
                  </ul>
        
                  <h3>Ưu Tiên</h3>
                  <ul>
                    <li>Kinh nghiệm làm việc với các thương hiệu lớn</li>
                    <li>Kỹ năng viết lách và giao tiếp tốt</li>
                  </ul>
                </div>
            `,
            salary: 12000000,
            experience: 2,
            deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            createdAt: new Date(),
            updatedAt: new Date(),
            headcount: 7,
            companyId: companies[4]._id,
            jobTypeId: jobTypes[3]._id,
            categoryId: jobCategories[6]._id,
            locationId: locations[4]._id,
            isDel: false,
        },
        {
            title: 'Chuyên viên chăm sóc khách hàng',
            description: `
                <div>
                  <h3>Mô Tả Công Việc</h3>
                  <ul>
                    <li>Tiếp nhận và giải đáp các thắc mắc của khách hàng</li>
                    <li>Đảm bảo các vấn đề của khách hàng được giải quyết nhanh chóng</li>
                    <li>Ghi nhận ý kiến phản hồi và đề xuất cải thiện dịch vụ</li>
                    <li>Hỗ trợ khách hàng trong việc sử dụng sản phẩm/dịch vụ</li>
                  </ul>
        
                  <h3>Yêu Cầu</h3>
                  <ul>
                    <li>1+ năm kinh nghiệm trong chăm sóc khách hàng</li>
                    <li>Kỹ năng giao tiếp tốt và kiên nhẫn</li>
                    <li>Sử dụng thành thạo các công cụ hỗ trợ khách hàng như Zendesk</li>
                  </ul>
        
                  <h3>Ưu Tiên</h3>
                  <ul>
                    <li>Kinh nghiệm làm việc trong ngành dịch vụ hoặc thương mại điện tử</li>
                    <li>Khả năng giao tiếp tiếng Anh</li>
                  </ul>
                </div>
            `,
            salary: 10000000,
            experience: 1,
            deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            createdAt: new Date(),
            updatedAt: new Date(),
            headcount: 3,
            companyId: companies[5]._id,
            jobTypeId: jobTypes[2]._id,
            categoryId: jobCategories[6]._id,
            locationId: locations[5]._id,
            isDel: false,
        },
        {
            title: 'Nhân viên bán hàng trực tuyến',
            description: `
                <div>
                  <h3>Mô Tả Công Việc</h3>
                  <ul>
                    <li>Quản lý danh mục sản phẩm trên các nền tảng trực tuyến</li>
                    <li>Xử lý đơn hàng và phối hợp với bộ phận kho vận để giao hàng</li>
                    <li>Hỗ trợ khách hàng trực tuyến qua các kênh chat hoặc email</li>
                    <li>Phân tích dữ liệu bán hàng và đưa ra đề xuất cải thiện</li>
                  </ul>
        
                  <h3>Yêu Cầu</h3>
                  <ul>
                    <li>2+ năm kinh nghiệm trong bán hàng trực tuyến</li>
                    <li>Am hiểu các nền tảng thương mại điện tử như Shopee, Lazada</li>
                    <li>Kỹ năng sử dụng Excel và các phần mềm quản lý đơn hàng</li>
                  </ul>
        
                  <h3>Ưu Tiên</h3>
                  <ul>
                    <li>Kinh nghiệm trong quản lý cửa hàng trực tuyến</li>
                    <li>Kỹ năng xử lý tình huống và làm việc nhóm</li>
                  </ul>
                </div>
            `,
            salary: 13000000,
            experience: 2,
            deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            createdAt: new Date(),
            updatedAt: new Date(),
            headcount: 8,
            companyId: companies[5]._id,
            jobTypeId: jobTypes[3]._id,
            categoryId: jobCategories[5]._id,
            locationId: locations[5]._id,
            isDel: false,
        },
    ]);

    const applications = await ApplicationModel.insertMany([
        // Ứng tuyển cho job 1
        {
            jobId: jobs[0]._id,
            candidateProfileId: candidateProfiles[0]._id,
            selectedCvLink: '/uploads/[candidate1@example.com]-cyber.pdf',
            status: E_ApplicationStatus.SUBMITTED,
            appliedAt: new Date(),
        },
        {
            jobId: jobs[0]._id,
            candidateProfileId: candidateProfiles[1]._id,
            selectedCvLink: '/uploads/[candidate2@example.com]-cyber.pdf',
            status: E_ApplicationStatus.SUBMITTED,
            appliedAt: new Date(),
        },

        // Ứng tuyển cho job 2
        {
            jobId: jobs[1]._id,
            candidateProfileId: candidateProfiles[2]._id,
            selectedCvLink: '/uploads/[candidate3@example.com]-cyber.pdf',
            status: E_ApplicationStatus.SUBMITTED,
            appliedAt: new Date(),
        },
        {
            jobId: jobs[1]._id,
            candidateProfileId: candidateProfiles[3]._id,
            selectedCvLink: '/uploads/[candidate4@example.com]-cyber.pdf',
            status: E_ApplicationStatus.SUBMITTED,
            appliedAt: new Date(),
        },

        // Ứng tuyển cho job 3
        {
            jobId: jobs[2]._id,
            candidateProfileId: candidateProfiles[4]._id,
            selectedCvLink: '/uploads/[candidate5@example.com]-cyber.pdf',
            status: E_ApplicationStatus.SUBMITTED,
            appliedAt: new Date(),
        },
        {
            jobId: jobs[2]._id,
            candidateProfileId: candidateProfiles[0]._id,
            selectedCvLink: '/uploads/[candidate1@example.com]-cyber.pdf',
            status: E_ApplicationStatus.SUBMITTED,
            appliedAt: new Date(),
        },

        // Ứng tuyển cho job 4
        {
            jobId: jobs[3]._id,
            candidateProfileId: candidateProfiles[1]._id,
            selectedCvLink: '/uploads/[candidate2@example.com]-cyber.pdf',
            status: E_ApplicationStatus.SUBMITTED,
            appliedAt: new Date(),
        },
        {
            jobId: jobs[3]._id,
            candidateProfileId: candidateProfiles[2]._id,
            selectedCvLink: '/uploads/[candidate3@example.com]-cyber.pdf',
            status: E_ApplicationStatus.SUBMITTED,
            appliedAt: new Date(),
        },

        // Ứng tuyển cho job 5
        {
            jobId: jobs[4]._id,
            candidateProfileId: candidateProfiles[3]._id,
            selectedCvLink: '/uploads/[candidate4@example.com]-cyber.pdf',
            status: E_ApplicationStatus.SUBMITTED,
            appliedAt: new Date(),
        },
        {
            jobId: jobs[4]._id,
            candidateProfileId: candidateProfiles[4]._id,
            selectedCvLink: '/uploads/[candidate5@example.com]-cyber.pdf',
            status: E_ApplicationStatus.SUBMITTED,
            appliedAt: new Date(),
        },

        // Ứng tuyển cho job 6
        {
            jobId: jobs[5]._id,
            candidateProfileId: candidateProfiles[0]._id,
            selectedCvLink: '/uploads/[candidate1@example.com]-cyber.pdf',
            status: E_ApplicationStatus.SUBMITTED,
            appliedAt: new Date(),
        },
        {
            jobId: jobs[5]._id,
            candidateProfileId: candidateProfiles[1]._id,
            selectedCvLink: '/uploads/[candidate2@example.com]-cyber.pdf',
            status: E_ApplicationStatus.SUBMITTED,
            appliedAt: new Date(),
        },

        // Ứng tuyển cho job 7
        {
            jobId: jobs[6]._id,
            candidateProfileId: candidateProfiles[2]._id,
            selectedCvLink: '/uploads/[candidate3@example.com]-cyber.pdf',
            status: E_ApplicationStatus.SUBMITTED,
            appliedAt: new Date(),
        },
        {
            jobId: jobs[6]._id,
            candidateProfileId: candidateProfiles[3]._id,
            selectedCvLink: '/uploads/[candidate4@example.com]-cyber.pdf',
            status: E_ApplicationStatus.SUBMITTED,
            appliedAt: new Date(),
        },

        // Ứng tuyển cho job 8
        {
            jobId: jobs[7]._id,
            candidateProfileId: candidateProfiles[4]._id,
            selectedCvLink: '/uploads/[candidate5@example.com]-cyber.pdf',
            status: E_ApplicationStatus.SUBMITTED,
            appliedAt: new Date(),
        },
        {
            jobId: jobs[7]._id,
            candidateProfileId: candidateProfiles[0]._id,
            selectedCvLink: '/uploads/[candidate1@example.com]-cyber.pdf',
            status: E_ApplicationStatus.SUBMITTED,
            appliedAt: new Date(),
        },

        // Ứng tuyển cho job 9
        {
            jobId: jobs[8]._id,
            candidateProfileId: candidateProfiles[1]._id,
            selectedCvLink: '/uploads/[candidate2@example.com]-cyber.pdf',
            status: E_ApplicationStatus.SUBMITTED,
            appliedAt: new Date(),
        },
        {
            jobId: jobs[8]._id,
            candidateProfileId: candidateProfiles[2]._id,
            selectedCvLink: '/uploads/[candidate3@example.com]-cyber.pdf',
            status: E_ApplicationStatus.SUBMITTED,
            appliedAt: new Date(),
        },

        // Ứng tuyển cho job 10
        {
            jobId: jobs[9]._id,
            candidateProfileId: candidateProfiles[3]._id,
            selectedCvLink: '/uploads/[candidate4@example.com]-cyber.pdf',
            status: E_ApplicationStatus.SUBMITTED,
            appliedAt: new Date(),
        },
        {
            jobId: jobs[9]._id,
            candidateProfileId: candidateProfiles[4]._id,
            selectedCvLink: '/uploads/[candidate5@example.com]-cyber.pdf',
            status: E_ApplicationStatus.SUBMITTED,
            appliedAt: new Date(),
        },

        // Ứng tuyển cho job 11
        {
            jobId: jobs[10]._id,
            candidateProfileId: candidateProfiles[0]._id,
            selectedCvLink: '/uploads/[candidate1@example.com]-cyber.pdf',
            status: E_ApplicationStatus.SUBMITTED,
            appliedAt: new Date(),
        },
        {
            jobId: jobs[10]._id,
            candidateProfileId: candidateProfiles[1]._id,
            selectedCvLink: '/uploads/[candidate2@example.com]-cyber.pdf',
            status: E_ApplicationStatus.SUBMITTED,
            appliedAt: new Date(),
        },

        // Ứng tuyển cho job 12
        {
            jobId: jobs[11]._id,
            candidateProfileId: candidateProfiles[2]._id,
            selectedCvLink: '/uploads/[candidate3@example.com]-cyber.pdf',
            status: E_ApplicationStatus.SUBMITTED,
            appliedAt: new Date(),
        },
        {
            jobId: jobs[11]._id,
            candidateProfileId: candidateProfiles[3]._id,
            selectedCvLink: '/uploads/[candidate4@example.com]-cyber.pdf',
            status: E_ApplicationStatus.SUBMITTED,
            appliedAt: new Date(),
        },
    ]);

    console.log('Dữ liệu đã được khởi tạo thành công!');
}
