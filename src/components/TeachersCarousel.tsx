import Image from 'next/image';
import teachers from '@/lib/teachers';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

interface TeachersCarouselProps {
  onTeacherHover: (description: string | null) => void;
  onTeacherClick: (description: string, name: string) => void;
}

export default function TeachersCarousel({ onTeacherHover, onTeacherClick }: TeachersCarouselProps) {

  return (
    <div className="w-full flex justify-center relative">
      <Swiper
        modules={[Pagination]}
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        centeredSlides={true}
        pagination={{ clickable: true }}
        className="w-full max-w-6xl pb-14"
        grabCursor={true}
        breakpoints={{
          0: { 
            slidesPerView: 1, 
            spaceBetween: 20 
          },
          640: { 
            slidesPerView: 2, 
            spaceBetween: 25 
          },
          1024: { 
            slidesPerView: 3, 
            spaceBetween: 30 
          },
        }}
      >
        {teachers.map((teacher) => (
          <SwiperSlide key={teacher.name}>
            <div
              className="flex flex-col items-center cursor-pointer w-full max-w-[280px] mx-auto group"
              onMouseEnter={() => onTeacherHover(teacher.description || '')}
              onMouseLeave={() => onTeacherHover(null)}
              onClick={() => onTeacherClick(teacher.description || '', teacher.name)}
            >
              <div className="w-full aspect-square relative overflow-hidden mb-5 rounded-xl shadow-lg group-hover:shadow-2xl transition-shadow duration-300">
                <Image
                  src={teacher.image}
                  alt={teacher.name}
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-bauhaus-green text-lg font-semibold text-center">
                {teacher.name}
              </span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
} 
 