using AutoMapper;
using YeProfspilka.Core.Entities;
using YeProfspilka.Core.Models;

namespace YeProfspilka.Backend.Mappers;

public class QuestionMapper : Profile
{
	public QuestionMapper()
	{
		CreateMap<QuestionDto, Question>();
		CreateMap<Question, QuestionDto>();
	}
}