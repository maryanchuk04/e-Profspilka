using YeProfspilka.Core.Entities.Base;

namespace YeProfspilka.Core.Interfaces;

public interface ICrudService<T> where T: BaseEntity
{
	Task Create(T entity);

	void Update(T entity);

	Task Delete(Guid id);

	Task<T> GetById(Guid id);

	Task<IEnumerable<T>> Get();
}