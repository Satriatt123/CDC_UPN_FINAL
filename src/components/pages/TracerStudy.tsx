import React, { useState } from 'react';
// Path disesuaikan untuk lokasi src/components/pages/TracerStudy.tsx
import { User, Page } from '../../App'; 
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '../ui/select';
import { AlertCircle } from 'lucide-react'; 

// Definisikan tipe untuk data formulir
interface FormData {
  fullName: string;
  graduationYear: string;
  currentStatus: string; 
  
  // Bidang untuk 'bekerja'
  companyName: string;
  jobTitle: string;
  timeToFirstJob: string;
  salaryRange: string;
  jobRelevance: string;

  // Bidang untuk 'studi'
  universityName: string;
  fieldOfStudy: string;

  // Bidang untuk 'wirausaha'
  businessName: string;
  businessField: string;
}

// Definisikan props
interface TracerStudyProps {
  currentUser: User | null;
  onNavigate: (page: Page) => void;
}

export function TracerStudy({ currentUser, onNavigate }: TracerStudyProps) {
  
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    graduationYear: '',
    currentStatus: '',
    companyName: '',
    jobTitle: '',
    timeToFirstJob: '',
    salaryRange: '',
    jobRelevance: '',
    universityName: '',
    fieldOfStudy: '',
    businessName: '',
    businessField: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleValueChange = (name: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Logika pengiriman data (sama seperti sebelumnya)
    const submissionData = {
      userEmail: currentUser?.identifier,
      fullName: formData.fullName,
      graduationYear: formData.graduationYear,
      currentStatus: formData.currentStatus,
      
      ...(formData.currentStatus === 'bekerja' && {
        companyName: formData.companyName,
        jobTitle: formData.jobTitle,
        timeToFirstJob: formData.timeToFirstJob,
        salaryRange: formData.salaryRange,
        jobRelevance: formData.jobRelevance,
      }),

      ...(formData.currentStatus === 'studi' && {
        universityName: formData.universityName,
        fieldOfStudy: formData.fieldOfStudy,
      }),

      ...(formData.currentStatus === 'wirausaha' && {
        businessName: formData.businessName,
        businessField: formData.businessField,
      }),
    };

    console.log('Data Tracer Study Dikirim:', submissionData);

    // Di sini akan ada fetch API ke backend untuk menyimpan data
    alert('Terima kasih! Data Anda telah berhasil dikirim.');
    onNavigate('home'); 
  };


  // --- 1. Tampilan jika BELUM LOGIN ---
  if (!currentUser) {
    return (
      <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center text-center">
        <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Akses Dibatasi</h2>
        <p className="text-gray-600 mb-6">
          Anda harus login sebagai alumni untuk dapat mengisi Tracer Study ini.
        </p>
        <Button 
          className="bg-amber-400 text-[#0f5c3c] hover:bg-amber-500"
          onClick={() => onNavigate('signin')}
        >
          Login Sekarang
        </Button>
      </div>
    );
  }

  // --- 2. Tampilan jika SUDAH LOGIN (Formulir Utama) ---
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <header className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-[#0f5c3c]">Tracer Study Alumni</h1>
        <p className="text-lg text-gray-700 mt-2">
          Bantu kami meningkatkan kualitas pendidikan dengan membagikan data karier dan studi lanjut Anda. Data Anda sangat berarti bagi kami.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-10">
        
        {/* --- Bagian 1: Data Diri (Grid 2 Kolom Konsisten) --- */}
        <fieldset className="space-y-6 p-6 border rounded-xl shadow-lg">
          <legend className="text-xl font-semibold px-2 text-[#0f5c3c]">Bagian 1: Data Diri</legend>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email (Akun)</Label>
              <Input id="email" value={currentUser.identifier} disabled className="bg-gray-100" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fullName">Nama Lengkap (Sesuai Ijazah)</Label>
              <Input id="fullName" value={formData.fullName} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="graduationYear">Tahun Lulus</Label>
              <Input id="graduationYear" type="number" placeholder="Contoh: 2023" value={formData.graduationYear} onChange={handleChange} required />
            </div>
          </div>
        </fieldset>

        {/* --- Bagian 2: Status Saat Ini --- */}
        <fieldset className="space-y-4 p-6 border rounded-xl shadow-lg">
          <legend className="text-xl font-semibold px-2 text-[#0f5c3c]">Bagian 2: Status Utama Saat Ini</legend>
          <RadioGroup
            value={formData.currentStatus}
            onValueChange={(value) => handleValueChange('currentStatus', value)}
            className="flex flex-wrap gap-x-8 gap-y-3 pt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="bekerja" id="r1" />
              <Label htmlFor="r1">Bekerja</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="studi" id="r2" />
              <Label htmlFor="r2">Studi Lanjut</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="wirausaha" id="r3" />
              <Label htmlFor="r3">Wirausaha</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="belum" id="r4" />
              <Label htmlFor="r4">Belum Bekerja</Label>
            </div>
          </RadioGroup>
        </fieldset>

        {/* --- Bagian 3: Detail (Kondisional) --- */}

        {/* Tampilan jika memilih "Bekerja" */}
        {formData.currentStatus === 'bekerja' && (
          <fieldset className="space-y-6 p-6 border-2 border-green-400 rounded-xl shadow-xl bg-green-50 animate-in fade-in-50">
            <legend className="text-xl font-semibold px-2 text-green-800">Bagian 3: Detail Pekerjaan</legend>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="companyName">Nama Perusahaan/Instansi</Label>
                <Input id="companyName" value={formData.companyName} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="jobTitle">Jabatan/Posisi</Label>
                <Input id="jobTitle" value={formData.jobTitle} onChange={handleChange} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="timeToFirstJob">Waktu Tunggu Mendapat Pekerjaan Pertama</Label>
                <Select onValueChange={(value) => handleValueChange('timeToFirstJob', value)} value={formData.timeToFirstJob}>
                  <SelectTrigger><SelectValue placeholder="Pilih waktu tunggu..." /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="< 6 bulan">Kurang dari 6 bulan</SelectItem>
                    <SelectItem value="6-12 bulan">6 - 12 bulan</SelectItem>
                    <SelectItem value="> 12 bulan">Lebih dari 12 bulan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="salaryRange">Kisaran Gaji Pertama (Per Bulan)</Label>
                <Select onValueChange={(value) => handleValueChange('salaryRange', value)} value={formData.salaryRange}>
                  <SelectTrigger><SelectValue placeholder="Pilih kisaran gaji..." /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="< 3jt">&lt; Rp 3.000.000</SelectItem>
                    <SelectItem value="3-5jt">Rp 3.000.000 - Rp 5.000.000</SelectItem>
                    <SelectItem value="5-10jt">Rp 5.000.000 - Rp 10.000.000</SelectItem>
                    <SelectItem value="10-15jt">Rp 10.000.000 - Rp 15.000.000</SelectItem>
                    <SelectItem value="> 15jt">&gt; Rp 15.000.000</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2 max-w-md"> {/* Dibatasi agar tidak terlalu lebar */}
              <Label htmlFor="jobRelevance">Kesesuaian Bidang Pekerjaan dengan Studi</Label>
              <Select onValueChange={(value) => handleValueChange('jobRelevance', value)} value={formData.jobRelevance}>
                <SelectTrigger><SelectValue placeholder="Pilih tingkat kesesuaian..." /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="tinggi">Sangat Sesuai</SelectItem>
                  <SelectItem value="sedang">Cukup Sesuai</SelectItem>
                  <SelectItem value="rendah">Tidak Sesuai</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </fieldset>
        )}

        {/* Tampilan jika memilih "Studi Lanjut" */}
        {formData.currentStatus === 'studi' && (
          <fieldset className="space-y-6 p-6 border-2 border-blue-400 rounded-xl shadow-xl bg-blue-50 animate-in fade-in-50">
            <legend className="text-xl font-semibold px-2 text-blue-800">Bagian 3: Detail Studi Lanjut</legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="universityName">Nama Perguruan Tinggi</Label>
                <Input id="universityName" value={formData.universityName} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fieldOfStudy">Program Studi / Bidang Kajian</Label>
                <Input id="fieldOfStudy" value={formData.fieldOfStudy} onChange={handleChange} />
              </div>
            </div>
          </fieldset>
        )}

        {/* Tampilan jika memilih "Wirausaha" */}
        {formData.currentStatus === 'wirausaha' && (
          <fieldset className="space-y-6 p-6 border-2 border-amber-400 rounded-xl shadow-xl bg-amber-50 animate-in fade-in-50">
            <legend className="text-xl font-semibold px-2 text-amber-800">Bagian 3: Detail Wirausaha</legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="businessName">Nama Usaha</Label>
                <Input id="businessName" value={formData.businessName} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="businessField">Bidang Usaha</Label>
                <Input id="businessField" placeholder="Contoh: Kuliner, Jasa Digital, Fashion" value={formData.businessField} onChange={handleChange} />
              </div>
            </div>
          </fieldset>
        )}

        {/* Tombol Submit */}
        <Button 
          type="submit" 
          size="lg" 
          className="w-full bg-[#0f5c3c] text-white hover:bg-[#0a472d] text-lg mt-8"
          disabled={!formData.currentStatus || !formData.fullName || !formData.graduationYear} 
        >
          Kirim Data Tracer Study
        </Button>

      </form>
    </div>
  );
}