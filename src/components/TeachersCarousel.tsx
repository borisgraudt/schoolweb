import Image from 'next/image';
import teachers from '@/lib/teachers';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

interface TeachersCarouselProps {
  onTeacherHover: (description: string | null) => void;
  onTeacherClick: (description: string, name: string) => void;
}

export default function TeachersCarousel({ onTeacherHover, onTeacherClick }: TeachersCarouselProps) {

  return (
    <>
      <div className="w-full flex justify-center">
        <Swiper
          slidesPerView={3}
          spaceBetween={25}
          loop={true}
          centeredSlides={true}
          className="py-0"
          grabCursor={true}
          breakpoints={{
            0: { slidesPerView: 1, spaceBetween: 5 },
            768: { slidesPerView: 3, spaceBetween: 25 },
          }}
        >
          {teachers.map((teacher, idx) => (
            <SwiperSlide key={teacher.name}>
              <div
                className="flex flex-col items-start cursor-pointer w-[250px] mx-auto relative"
                onMouseEnter={() => onTeacherHover(teacher.description || '')}
                onMouseLeave={() => onTeacherHover(null)}
                onClick={() => onTeacherClick(teacher.description || '', teacher.name)}
              >
                <span className="mb-2 mt-0 text-bauhaus-green text-xl font-semibold text-left w-full pl-1">{teacher.name}</span>
                <div
                  className="w-[250px] h-[250px] shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative"
                  style={{ overflow: 'hidden' }}
                >
                  <Image
                    src={teacher.image}
                    alt={teacher.name}
                    width={250}
                    height={250}
                    className="object-cover w-full h-full grayscale"
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
} 
 