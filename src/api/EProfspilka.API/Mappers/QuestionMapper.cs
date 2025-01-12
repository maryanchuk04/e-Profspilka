using AutoMapper;
using EProfspilka.Core.Entities;
using EProfspilka.Core.Models;

namespace EProfspilka.API.Mappers;

public class QuestionMapper : Profile
{
	public QuestionMapper()
	{
		CreateMap<QuestionDto, Question>();
		CreateMap<Question, QuestionDto>();
	}
}